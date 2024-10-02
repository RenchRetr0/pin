import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity, ImageEntity } from './storages/entities';
import { UserModule } from '@user/user.module';
import { UseCaseProviders } from './dependency-injection/domain';
import { RepositoryProviders } from './dependency-injection/domain/storage';
import { BoardController, ImageController } from './api';

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity, BoardEntity]), UserModule],
    controllers: [ImageController, BoardController],
    providers: [...UseCaseProviders, ...RepositoryProviders],
    exports: [],
})
export class PinModule {}
