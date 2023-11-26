import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeaturesActorModule, BackendFeaturesMovieModule } from '@org/backend/features';

@Module({
  imports: [BackendFeaturesMovieModule, BackendFeaturesActorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
