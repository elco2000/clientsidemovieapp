import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';

@Module({
    controllers: [ReviewController],
    providers: [ReviewService],
    imports: [MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/')],
    exports: [ReviewService]
})
export class BackendFeaturesReviewModule {}