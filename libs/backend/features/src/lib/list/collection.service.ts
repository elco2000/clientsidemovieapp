/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CreateCollectionDto } from "@org/backend/dto";
import { ICollection } from "@org/shared/api";
import { Neo4jService } from "nest-neo4j/dist";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CollectionService {
    TAG = 'CollectionService';

    constructor(
        private neo4jService: Neo4jService
    ) {}

    async getUserIdOfCollection(collectionId: string): Promise<string> {
        Logger.log(`Get user ID of collection ${collectionId}`, this.TAG);

        const result = await this.neo4jService.write(
            `
            MATCH (u:User)-[:MAKEDCOLLECTION]->(c:Collection { id: $collectionId })
            RETURN u.id AS userId
            `,
            { collectionId }
        );

        const userId = result.records[0]?.get('userId');
        return userId ?? null;
    }

    // Get All by user
    async getAllByUser(userId: string): Promise<ICollection[]> {
        Logger.log(`Get all collections by user`, this.TAG);
    
        const result = await this.neo4jService.write(
            `
            MATCH (u:User { id: $userId })-[:MAKEDCOLLECTION]->(c:Collection)
            RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
            `,
            { userId }
        );
    
        const collections = result.records.map((record: any) => record.get('c'));
        return collections;
    }    

    async getOne(collectionId: string): Promise<ICollection> {
        Logger.log(`Get collection by id`, this.TAG);
    
        const userId = await this.getUserIdOfCollection(collectionId);

        const result = await this.neo4jService.write(
            `
            MATCH (c:Collection { id: $collectionId })
            RETURN c.id as id, c.name as name, c.description as description, c.privateCollection as privateCollection, c.createDate as createDate, c.updatedDate as updatedDate
            `,
            { collectionId }
        );
    
        if (result.records.length === 0) {
            throw new Error(`Collection with ID ${collectionId} not found`);
        }
    
        const record = result.records[0];
        const collection: ICollection = {
            id: record.get('id'),
            name: record.get('name'),
            description: record.get('description'),
            privateCollection: record.get('privateCollection'),
            createDate: record.get('createDate'),
            updatedDate: record.get('updatedDate'),
            userId: userId
        };
    
        return collection;
    }

    // Get list where movie doesn't is included
    async getListsWithoutMovie(movieId: string): Promise<ICollection[]> {
        Logger.log(`Get collections without movie ${movieId}`, this.TAG);
    
        const result = await this.neo4jService.write(
            `
            MATCH (c:Collection)
            WHERE NOT (c)-[:CONTAINS]->(:Movie { id: $movieId })
            RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
            `,
            { movieId }
        );
    
        const collections = result.records.map((record: any) => record.get('c'));
        return collections;
    }

    async getMovieIdsOfCollection(collectionId: string): Promise<string[]> {
        Logger.log(`Get movie IDs of collection ${collectionId}`, this.TAG);
    
        const result = await this.neo4jService.write(
            `
            MATCH (c:Collection { id: $collectionId })-[:CONTAINS]->(m:Movie)
            RETURN COLLECT(m.id) AS movieIds
            `,
            { collectionId }
        );
    
        return result.records[0]?.get('movieIds') ?? [];
    }

    // Post create
    async create(collection: CreateCollectionDto): Promise<ICollection> {
        Logger.log(`Create collection`, this.TAG);
        const { name, description, privateCollection } = collection;

        const id = uuidv4();
        const createDate = new Date().toDateString();

        const createdCollection = await this.neo4jService.write(
            `
            CREATE (c:Collection {
                id: $id,
                name: $name,
                description: $description,
                private: $privateCollection,
                createDate: $createDate,
                updatedDate: $createDate
            })
            return c {.id, .name, .description, .private, .createDate, .updatedDate}
            `,
            { id, name, description, privateCollection, createDate}
        )

        const newCollection = createdCollection.records[0]?.get('c');
        if (!newCollection) {
            throw new Error('Failed to create review');
        }

        const userId = collection.userId;
        const collectionId = newCollection.id;

        await this.neo4jService.write(
            `
            MATCH (u:User), (c:Collection)
            WHERE u.id = $userId and c.id = $collectionId
            MERGE (u)-[:MAKEDCOLLECTION]->(c)
            `,
            { userId: userId, collectionId: collectionId }
        )

        return newCollection;
    }

    // Put update
    async update(id: string, req: any): Promise<ICollection | null> {
        Logger.log(`Update collection`, this.TAG);
        const collection = req.body;
        const userId = req.user.user_id;

        Logger.debug(userId, collection.userId);

        if (userId === collection.userId) {
            const updatedDate = new Date().toDateString();

            const result = await this.neo4jService.write(
                `
                MATCH (c:Collection {id: $id})
                RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
                `,
                { id: id }
            )

            if (!result.records[0]) {
                Logger.debug('Collection not found');
                return null;
            };

            const updatedCollection: Partial<ICollection> = {
                name: collection.name,
                description: collection.description,
                privateCollection: collection.privateCollection,
                updatedDate: updatedDate
            };

            const updateResult = await this.neo4jService.write(
                `
                MATCH (c:Collection {id: $id})
                SET c += $updatedCollection
                RETURN c {.id, .name, .description, .privateCollection, .createDate, .updatedDate}
                `,
                { id: id, updatedCollection: updatedCollection }
            );

            if (!updateResult.records[0]) {
                throw new Error('Failed to update collection');
            };
            
            const updatedResult = updateResult.records[0].get('c');

            const updatedCollectionInfo: ICollection = {
                id: updatedResult.id,
                name: updatedResult.name,
                description: updatedResult.description,
                privateCollection: updatedResult.privateCollection,
                createDate: updatedResult.createDate,
                updatedDate: updatedResult.updatedDate,
                userId: userId
            };

            return updatedCollectionInfo;
        }

        throw new UnauthorizedException();
    }

    // Delete
    async delete(id: string) {
        Logger.log('delete', this.TAG);

            const deleteResult = await this.neo4jService.write(
                `
                MATCH (c:Collection {id: $id})
                DETACH DELETE c
                `,
                { id: id }
            );
    
            const containsUpdates = deleteResult.summary.updateStatistics.containsUpdates();
    
            if (!containsUpdates) {
                Logger.debug('Failed to delete collection');
                throw new Error('Failed to delete collection');
            }
    
            return 'Success';
    }


    async addToCollection(req: any): Promise<string> {
        const data = req.body;
        const userIdLoggedInUser = req.user.user_id;
        Logger.log(`User ${data.userId} puts movie ${data.movieId} to collection ${data.collectionId}`, this.TAG);

        const userId = data.userId;
        const movieId = data.movieId;
        const collectionId = data.collectionId;

        if (userIdLoggedInUser === userId) {
            const result = await this.neo4jService.write(
                `
                MATCH (c:Collection), (m:Movie)
                WHERE c.id = $collectionId AND m.id = $movieId
                MERGE (c)-[:CONTAINS]->(m)
                `,
                { collectionId, movieId }
            );

            const containsUpdates = result.summary.updateStatistics.containsUpdates();
    
            if (!containsUpdates) {
                Logger.debug('Failed to contain movie');
                return 'Failed';
            }

            return 'Succes';
        }

        throw new UnauthorizedException();
    
    }

    async RemoveFromCollection(req: any): Promise<string> {
        const data = req.body;
        const userIdLoggedInUser = req.user.user_id;
        Logger.log(`User ${data.userId} removes movie ${data.movieId} from collection ${data.collectionId}`, this.TAG);

        const userId = data.userId;
        const movieId = data.movieId;
        const collectionId = data.collectionId;

        if (userIdLoggedInUser === userId) {
            const result = await this.neo4jService.write(
                `
                MATCH (c:Collection)-[r:CONTAINS]->(m:Movie)
                WHERE c.id = $collectionId AND m.id = $movieId
                DELETE r
                `,
                { collectionId, movieId }
            );

            const containsUpdates = result.summary.updateStatistics.containsUpdates();
    
            if (!containsUpdates) {
                Logger.debug('Failed to remove movie');
                return 'Failed';
            }

            return 'Succes';
        }

        throw new UnauthorizedException();
    
    }

        
}