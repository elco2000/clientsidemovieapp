import { Body, Get, Put } from '@nestjs/common';
import { Controller, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUser, IUserInfo } from "@org/shared/api";
import { UpdateUserDto } from '@org/backend/dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

        @Get('')
        async getAll(): Promise<IUser[]> {
            return this.userService.getAll();
        }

        @Get(':id')
        async getOne(@Param('id') userid: string): Promise<IUser | null> {
            return this.userService.findById(userid);
        }
    
        @Put(':id')
        async update(@Param('id') userid: string, @Body() data: UpdateUserDto): Promise<IUserInfo | null> {
            return this.userService.update(userid ,data);
        }

        @Put(':userid/follow/:followuserid')
        async follow(@Param('userid') userid: string, @Param('followuserid') followuserid: string): Promise<IUser | null> {
            return this.userService.follow(userid, followuserid);
        }

        @Put(':userid/unfollow/:unfollowuserid')
        async unfollow(@Param('userid') userid: string, @Param('unfollowuserid') unfollowuserid: string): Promise<IUser | null> {
            return this.userService.unfollow(userid, unfollowuserid);
        }

        @Get(':id/followers')
        async getFollowers(@Param('id') userid: string): Promise<IUser[]> {
            return this.userService.getFollowers(userid);
        }

        @Get(':id/following')
        async getFollowing(@Param('id') userid: string): Promise<IUser[]> {
            return this.userService.getFollowing(userid);
        }
}