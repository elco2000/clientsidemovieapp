/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "@org/backend/dto";
import { IUserCredentials, IUserIdentity } from "@org/shared/api";
import { Neo4jService } from "nest-neo4j";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private neo4jService: Neo4jService,
        private jwtService: JwtService
    ) {}

    async validateUser(credentials: IUserCredentials): Promise<any> {
        this.logger.log('validateUser');
        const username = credentials.username;
        const userResult = await this.neo4jService.read(`
            MATCH (u:User {username: $username})
            RETURN u {.id, .username, .password, .birthdate, .country, .description}
            `, { username });

        const user = userResult.records[0]?.get('u');
        if (user && user.password === credentials.password) {
            return user;
        }
        return null;
    }

    async login(credentials: IUserCredentials): Promise<IUserIdentity> {
        this.logger.log('login ' + credentials.username);
        const username = credentials.username;
    
        try {
            const user = await this.neo4jService.read(
                `
                MATCH (u:User {username: $username})
                RETURN u
                `,
                { username }
            );
    
            const result = user.records[0];
    
            if (result && result.get('u').properties.password === credentials.password) {
                const userProperties = result.get('u').properties;
                const payload = {
                    user_id: userProperties.id, // Using identity as the ID
                    role: userProperties.role
                };
                const userIdentity: IUserIdentity = {
                    id: userProperties.id,
                    username: userProperties.username,
                    password: userProperties.password,
                    role: userProperties.role,
                    token: this.jwtService.sign(payload)
                };
                return userIdentity;
            } else {
                const errMsg = 'Email not found or password invalid';
                this.logger.debug(errMsg);
                throw new UnauthorizedException(errMsg);
            }
        } catch (error) {
            this.logger.error('Error occurred during login: ', error);
            throw new UnauthorizedException('Error occurred during login');
        }
    }

    async register(user: CreateUserDto): Promise<IUserIdentity> {
        this.logger.log(`Register user ${user.username}`);
        const { username, password, birthdate, country, description, role } = user;

        const userResult = await this.neo4jService.read(
            `MATCH (u:User {username: $username})
            RETURN u {.id, .username, .password, .birthdate, .country, .description}`,
            { username }
        );

        const existingUser = userResult.records[0]?.get('u');
        if (existingUser) {
            this.logger.debug('User exists');
            throw new ConflictException('User already exists');
        }

        this.logger.debug('User not found, creating');
        const id = uuidv4();
        const createdUser = await this.neo4jService.write(
            `
            CREATE (u:User {
                id: $id,
                username: $username,
                password: $password,
                birthdate: $birthdate,
                country: $country,
                description: $description,
                role: 'Guest'
            })
            RETURN u {.id, .username, .password, .birthdate, .country, .description, .role}
            `,
            { id, username, password, birthdate, country, description, role }
        );

        const newUser = createdUser.records[0]?.get('u');
        if (!newUser) {
            throw new Error('Failed to create user');
        }

        return newUser;
    }
}