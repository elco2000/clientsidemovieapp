import { Body, Controller, Logger, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "@org/backend/dto";
import { AuthService } from "./auth.service";
import { IUserCredentials, IUserIdentity } from "@org/shared/api";
import { Public } from "../decorators/decorators";
import { UserExistsGuard } from "@org/backend/user";

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() credentials: IUserCredentials): Promise<IUserIdentity> {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }

    @Public()
    @UseGuards(UserExistsGuard)
    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<IUserIdentity> {
        this.logger.log('Register');
        return await this.authService.register(user);
    }
}
