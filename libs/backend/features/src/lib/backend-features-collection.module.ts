import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "@org/backend/auth";
import { CollectionController } from "./collection/collection.controller";
import { CollectionService } from "./collection/collection.service";

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