import { Body, Controller, Param, Post, Put, Delete } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto, UpdateReviewDto } from "@org/backend/dto";
import { IReview } from "@org/shared/api";

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}

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