import { Injectable, Logger } from "@nestjs/common";
import { UpdateUserDto } from "@org/backend/dto";
import { IUser, IUserInfo } from "@org/shared/api";
import { Neo4jService } from "nest-neo4j";

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(
        private neo4jService: Neo4jService
    ) {}

    async findById(id: string): Promise<IUser | null> {
        this.logger.log(`Finding user with id ${id}`);
        const item = await this.neo4jService.read(`
            MATCH (u:User { id: $id })
            RETURN u {.id, .username, .birthdate, .country, .description} as user
        `, { id }); // Voeg de id toe als parameter in het query-object
        if (!item.records[0]) {
            this.logger.debug('User not found');
            return null;
        }

        console.log(item.records[0]);

        const result = item.records[0];
        const resultProperties = result.get('user');

        const user : IUser = {
            id: resultProperties.id,
            username: resultProperties.username,
            birthdate: resultProperties.birthdate,
            country: resultProperties.country,
            description: resultProperties.description
        }

        return user;
    }

    async update(id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
        this.logger.log(`Update user ${user.username}`);
    
        const result = await this.neo4jService.write(
            `
            MATCH (u:User { id: $id })
            RETURN u {.id, .username, .password, .birthdate, .country, .description} as user
            `,
            { id }
        );
    
        if (!result.records[0]) {
            this.logger.debug('User not found');
            return null;
        }
    
        const existingResult = result.records[0].get('user');
    
        const existingUser: IUserInfo = {
            id: existingResult.id,
            username: existingResult.username,
            password: existingResult.password,
            birthdate: existingResult.birthdate,
            country: existingResult.country,
            description: existingResult.description,
        };
    
        const updatedUser: Partial<IUserInfo> = {
            username: user.username,
            password: user.password || existingUser.password,
            description: user.description || existingUser.description,
        };
    
        const updateResult = await this.neo4jService.write(
            `
            MATCH (u:User { id: $id })
            SET u += $updatedUser
            RETURN u {.id, .username, .birthdate, .country, .description} as user
            `,
            { id, updatedUser }
        );
    
        if (!updateResult.records[0]) {
            throw new Error('Failed to update user');
        }
    
        const updatedResult = updateResult.records[0].get('user');
    
        const updatedUserInfo: IUserInfo = {
            id: updatedResult.id,
            username: updatedResult.username,
            password: updatedResult.password,
            birthdate: updatedResult.birthdate,
            country: updatedResult.country,
            description: updatedResult.description,
        };
    
        return updatedUserInfo;
    }

    async follow(userId: string, followUserId: string): Promise<string> {
        this.logger.log(`User ${userId} follows user ${followUserId}`);
    
        const result = await this.neo4jService.write(
            `
            MATCH (u:User), (f:User)
            WHERE u.id = $userId AND f.id = $followUserId
            MERGE (u)-[:FOLLOWS]->(f)
            `,
            { userId, followUserId }
        );
            
            const containsUpdates = result.summary.updateStatistics.containsUpdates();
    
            if (!containsUpdates) {
                this.logger.debug('Failed to follow user');
                return 'Failed';
            }

        return 'Succes';
    }
    
    async unfollow(userId: string, followUserId: string): Promise<string> {
        this.logger.log(`User ${userId} unfollows user ${followUserId}`);
    
        const result = await this.neo4jService.write(
            `
            MATCH (u:User)-[r:FOLLOWS]->(f:User)
            WHERE u.id = $userId AND f.id = $followUserId
            DELETE r
            `,
            { userId, followUserId }
        );
    
        const containsUpdates = result.summary.updateStatistics.containsUpdates();

        if (!containsUpdates) {
            this.logger.debug('Failed to unfollow user');
            return 'Failed';
        }

        return 'Succes';
    }

    
    async getFollowers(userId: string): Promise<IUser[]> {
        this.logger.log(`Getting followers for user with ID ${userId}`);
        
        const result = await this.neo4jService.read(
            `
            MATCH (u:User)-[:FOLLOWS]->(follower:User)
            WHERE follower.id = $userId
            RETURN u.id AS id, u.username AS username, u.birthdate AS birthdate, u.country AS country, u.description AS description
            `,
            { userId }
        );

        const followers: IUser[] = result.records.map((record) => ({
            id: record.get('id'),
            username: record.get('username'),
            birthdate: record.get('birthdate'),
            country: record.get('country'),
            description: record.get('description'),
        }));
        
        return followers;
    }

    async getFollowing(userId: string): Promise<IUser[]> {
        this.logger.log(`Getting users followed by user with ID ${userId}`);
        
        const result = await this.neo4jService.read(
            `
            MATCH (u:User)-[:FOLLOWS]->(following:User)
            WHERE u.id = $userId
            RETURN following.id AS id, following.username AS username, following.birthdate AS birthdate, following.country AS country, following.description AS description
            `,
            { userId }
        );

        const following: IUser[] = result.records.map((record) => ({
            id: record.get('id'),
            username: record.get('username'),
            birthdate: record.get('birthdate'),
            country: record.get('country'),
            description: record.get('description'),
        }));
        
        return following;
    }
}