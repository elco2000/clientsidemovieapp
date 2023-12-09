import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "@org/backend/auth";
import { CollectionController } from "./list/collection.controller";
import { CollectionService } from "./list/collection.service";

@Module({
    controllers: [CollectionController],
    providers: [CollectionService],
    imports: [
        AuthModule,
        JwtModule
    ],
    exports: [CollectionService]
})
export class BackendFeaturesCollectionModule {}