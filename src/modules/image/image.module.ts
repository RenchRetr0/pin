import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './storage/entity';
import { UserModule } from '@user/user.module';
import { ImageRepositoryProvider } from './dependency-injection/providers/storage';
import { BoardModule } from '@board/board.module';
import { ImageProviders } from './dependency-injection/providers/domain';
import { ImageController } from './api';

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity]), UserModule, BoardModule],
    controllers: [ImageController],
    providers: [...ImageProviders, ImageRepositoryProvider],
    exports: [],
})
export class ImageModule {}
