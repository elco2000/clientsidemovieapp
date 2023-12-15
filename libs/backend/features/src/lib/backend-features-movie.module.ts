import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { Movie, MovieSchema } from './movie/movie.schema';
import { AuthModule } from '@org/backend/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/'), MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema}]), AuthModule, JwtModule ],
  exports: [MovieService],
})
export class BackendFeaturesMovieModule {}
