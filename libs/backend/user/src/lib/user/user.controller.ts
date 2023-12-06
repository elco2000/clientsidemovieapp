import { Body, Delete, Get, Post, Put } from '@nestjs/common';
import { Controller, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUser, IUserInfo } from "@org/shared/api";
import { UpdateUserDto } from '@org/backend/dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

        @Get(':id')
        async findOne(@Param('id') id: string): Promise<IUser | null> {
            return this.userService.findById(id);
        }
    
        @Put(':id')
        async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUserInfo | null> {
            return this.userService.update(id ,data);
        }

        @Put('follow/:userid/:followuserid')
        async follow(@Param('userid') userid: string, @Param('followuserid') followuserid: string): Promise<string> {
            return this.userService.follow(userid, followuserid);
        }

        @Put('unfollow/:userid/:unfollowuserid')
        async unfollow(@Param('userid') userid: string, @Param('unfollowuserid') unfollowuserid: string): Promise<string> {
            return this.userService.unfollow(userid, unfollowuserid);
        }
}