import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendFeaturesActorModule, BackendFeaturesCollectionModule, BackendFeaturesMovieModule, BackendFeaturesReviewModule } from '@org/backend/features';
import { AuthModule } from '@org/backend/auth';
import { Neo4jModule } from 'nest-neo4j';
import { UserModule } from '@org/backend/user';

@Module({
  imports: [BackendFeaturesMovieModule, 
    BackendFeaturesActorModule, 
    BackendFeaturesReviewModule,
    BackendFeaturesCollectionModule, 
    AuthModule, 
    UserModule,
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '80f65338.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: '5nJgIGtl_bhK4gG2wKZwVvIkvpAOqWfZF770r33nvAE',
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
