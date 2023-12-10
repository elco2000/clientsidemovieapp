/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CreateReviewDto } from "@org/backend/dto";
import { IReview, IReviewInfo } from "@org/shared/api";
import { Neo4jService } from "nest-neo4j/dist";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewService {
    TAG = 'ReviewService';

    constructor(
        private neo4jService: Neo4jService
    ) {}

    async getAllByMovie(movieId: string): Promise<IReviewInfo[]> {
        Logger.log(`Get all reviews for movie ID: ${movieId}`, this.TAG);

        const result = await this.neo4jService.read(
            `
            MATCH (:Movie {id: $movieId})<-[:REVIEWMADEFOR]-(r:Review)<-[:MAKEDREVIEW]-(u:User)
            RETURN r {.id, .title, .text, .rating, .date, userId: u.id, username: u.username}
            `,
            { movieId }
        );

        return result.records.map((record) => record.get('r'));
    }

    async getOne(reviewId: string): Promise<IReviewInfo> {
        Logger.log(`Get review ${reviewId}`, this.TAG);

        const result = await this.neo4jService.read(
            `
            MATCH (r:Review {id: $reviewId})<-[:MAKEDREVIEW]-(u:User)
            RETURN r {.id, .title, .text, .rating, .date, userId: u.id, username: u.username}
            `,
            { reviewId }
        );

        if (result.records.length === 0) {
            throw new Error(`Review with ID ${reviewId} not found`);
        }

        return result.records[0].get('r');
    }

    async create(review: CreateReviewDto): Promise<IReview> {
        Logger.log(`Create review`, this.TAG);
        const { title, text, rating } = review;
        
        const id = uuidv4();
        const date = new Date().toDateString();

        const createdReview = await this.neo4jService.write(
            `
            CREATE (r:Review {
                id: $id,
                title: $title,
                text: $text,
                rating: $rating,
                date: $date
            })
            RETURN r {.id, .title, .text, .rating, .date}
            `,
            { id, title, text, rating, date}
        )

        const newReview = createdReview.records[0]?.get('r');
        if (!newReview) {
            throw new Error('Failed to create review');
        }

        const userId = review.userId;
        const reviewId = newReview.id;

        await this.neo4jService.write(
            `
            MATCH (u:User), (r:Review)
            WHERE u.id = $userId and r.id = $reviewId
            MERGE (u)-[:MAKEDREVIEW]->(r)
            `,
            { userId: userId, reviewId: reviewId }
        )

        const movieId = review.movieId;
        await this.neo4jService.write(
            `
            MATCH (r:Review), (m:Movie)
            WHERE r.id = $reviewId and m.id = $movieId
            MERGE (r)-[:REVIEWMADEFOR]->(m)
            `,
            { reviewId: reviewId, movieId: movieId }
        )

        return newReview;
    }

    async update(id: string, req: any): Promise<IReview | null> {
        Logger.log(`Update review`, this.TAG);
        const review = req.body;
        const userId = req.user.user_id;

        if( userId === review.userId) {
            const date = new Date().toDateString();

            const result = await this.neo4jService.write(
                `
                MATCH (r:Review {id: $id})
                RETURN r {.id, .title, .text, .rating, .date }
                `,
                { id: id }
            )
    
            if (!result.records[0]) {
                Logger.debug('User not found');
                return null;
            };
    
            const updatedReview: Partial<IReview> = {
                title: review.title,
                text: review.text,
                rating: review.rating,
                date: date
            };
    
            const updateResult = await this.neo4jService.write(
                `
                MATCH (r:Review {id: $id})
                SET r += $updatedReview
                RETURN r {.id, .title, .text, .rating, .date} as review
                `,
                { id: id, updatedReview: updatedReview }
            );
    
            if (!updateResult.records[0]) {
                throw new Error('Failed to update review');
            };
    
            const updatedResult = updateResult.records[0].get('review');
    
            const updatedReviewInfo: IReview = {
                id: updatedResult.id,
                title: updatedResult.title,
                text: updatedResult.text,
                rating: updatedResult.rating,
                date: updatedResult.date,
                userId: review.userId
            };
    
            return updatedReviewInfo;
        }

        throw new UnauthorizedException();
       
    }   

    async delete(id: string, req: any): Promise<string> {
        Logger.log('delete', this.TAG);
        const userThatDeleted = req.body;
        const userId = req.user.user_id;

        if(userThatDeleted.userId === userId) {
            const deleteResult = await this.neo4jService.write(
                `
                MATCH (r:Review {id: $id})
                DETACH DELETE r
                `,
                { id: id }
            );
    
            const containsUpdates = deleteResult.summary.updateStatistics.containsUpdates();
    
            if (!containsUpdates) {
                Logger.debug('Failed to delete review');
                throw new Error('Failed to delete review');
            }
    
            return 'Success';
        }

        throw new UnauthorizedException();
    }
}