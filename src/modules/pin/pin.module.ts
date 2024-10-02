import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './storages/entities';
import { UserModule } from '@user/user.module';
import { UseCaseProviders } from './dependency-injection/domain';
import { ImageProvider } from './dependency-injection/domain/storage';
import { ImageController, PinController } from './api';

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity]), UserModule],
    controllers: [ImageController, PinController],
    providers: [...UseCaseProviders, ImageProvider],
    exports: [],
})
export class PinModule {}
