import { Injectable, Logger } from "@nestjs/common";
import { CreateReviewDto, UpdateReviewDto } from "@org/backend/dto";
import { IReview } from "@org/shared/api";
import { Neo4jService } from "nest-neo4j/dist";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewService {
    TAG = 'ReviewService';

    constructor(
        private neo4jService: Neo4jService
    ) {}

    // GET All

    // GET by id

    // POST create
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
        const reviewId = newReview.id; // Verander '.Id' naar '.id'

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

    // PUT update
    async update(id: string, review: UpdateReviewDto): Promise<IReview | null> {
        Logger.log(`Update review`, this.TAG);

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


    // DELETE

    async delete(id: string): Promise<string> {
        Logger.log('delete', this.TAG);

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
}