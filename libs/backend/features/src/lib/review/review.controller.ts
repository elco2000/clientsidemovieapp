import { Body, Controller, Param, Post, Put, Delete, Get } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto, UpdateReviewDto } from "@org/backend/dto";
import { IReview, IReviewInfo } from "@org/shared/api";

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

    @Get('movie/:movieId')
    async getAll(@Param('movieId') movieId: string): Promise<IReviewInfo[]> {
        return this.reviewService.getAll(movieId);
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<IReviewInfo> {
        return this.reviewService.getOne(id);
    }

    @Post('')
    async create(@Body() data: CreateReviewDto): Promise<IReview> {
        return this.reviewService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateReviewDto): Promise<IReview | null> {
        return this.reviewService.update(id, data);
    }

    @Delete(':id')
    async delete (@Param('id') id: string): Promise<string> {
        return this.reviewService.delete(id);
    }
}