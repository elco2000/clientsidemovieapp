import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeaturesMovieModule } from '@org/backend/features';

@Module({
  imports: [BackendFeaturesMovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
