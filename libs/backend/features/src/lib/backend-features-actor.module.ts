import { MongooseModule } from "@nestjs/mongoose";
import { ActorController } from "./actor/actor.controller";
import { Actor, ActorSchema } from "./actor/actor.schema";
import { ActorService } from "./actor/actor.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "@org/backend/auth";

@Module({
    controllers: [ActorController],
    providers: [ActorService],
    imports: [MongooseModule.forRoot('mongodb+srv://elcoAdmin:Admin123Database@clusterlocaldataapi.m0cwagc.mongodb.net/'), MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema}]), AuthModule, JwtModule ],
    exports: [ActorService]
})
export class BackendFeaturesActorModule {}