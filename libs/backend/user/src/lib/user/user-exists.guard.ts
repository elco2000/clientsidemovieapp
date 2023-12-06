import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CreateUserDto } from "@org/backend/dto";
import { Neo4jService } from "nest-neo4j";

@Injectable()
export class UserExistsGuard implements CanActivate {
    constructor(private neo4jService: Neo4jService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.body as CreateUserDto;
        const username = user.username;
        if (!username) {
            return false; // Voeg een logica toe voor het geval de gebruikersnaam niet is gevonden
        }
        const userResult = await this.neo4jService.read(`
            MATCH (u:User {username: $username})
            RETURN u {.id, .username}
        `, { username });
        return !!userResult;
    }
}