/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Param, Post, Put, Delete, Get, UseGuards, Request } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "@org/backend/dto";
import { IReview, IReviewInfo } from "@org/shared/api";
import { AuthGuard } from "@org/backend/auth";

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

    @Get('movie/:movieId')
    async getAllByMovie(@Param('movieId') movieId: string): Promise<IReviewInfo[]> {
        return this.reviewService.getAllByMovie(movieId);
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<IReviewInfo> {
        return this.reviewService.getOne(id);
    }

    @Post('')
    @UseGuards(AuthGuard)
    async create(@Body() data: CreateReviewDto): Promise<IReview> {
        return this.reviewService.create(data);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Request() req: any): Promise<IReview | null> {
        return this.reviewService.update(id, req);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete (@Param('id') id: string, @Request() req: any): Promise<string> {
        return this.reviewService.delete(id, req);
    }
}