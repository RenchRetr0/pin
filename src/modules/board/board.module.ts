import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './storage/entity';
import { BoardRepositoryProvider } from './dependency-injection/providers/storage';
import { BoardProviders } from './dependency-injection/providers/domain';
import { UserModule } from '@user/user.module';
import { BoardController } from './api';
import { ExportBoardProviders } from './dependency-injection/exports';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity]), UserModule],
    controllers: [BoardController],
    providers: [...BoardProviders, BoardRepositoryProvider],
    exports: [...ExportBoardProviders],
})
export class BoardModule {}
