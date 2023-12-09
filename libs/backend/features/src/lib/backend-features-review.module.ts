import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { AuthModule } from '@org/backend/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [ReviewController],
    providers: [ReviewService],
    imports: [MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/'),
                AuthModule,
                JwtModule],
    exports: [ReviewService]
})
export class BackendFeaturesReviewModule {}