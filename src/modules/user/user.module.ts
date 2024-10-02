import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './storages/entity';
import { RepositoryProvider } from './dependency-injection/domain/storage';
import { UserProviders } from './dependency-injection/domain/domain';
import { ExportProviders } from './dependency-injection/exports';
import { UserController } from './api';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [
        UserController
    ],
    providers: [
        ...UserProviders,
        RepositoryProvider
    ],
    exports: [
        ...ExportProviders
    ]
})
export class UserModule {}
