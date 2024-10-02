import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ImageEntity } from '@pin/storages/entities';
import { UserEntity } from '@user/storages/entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get<string>('APP_DB_HOST'),
            port: configService.get<number>('APP_DB_PORT'),
            username: configService.get<string>('APP_DB_USERNAME'),
            database: configService.get<string>('APP_DB_NAME'),
            password: configService.get<string>('APP_DB_PASSWORD'),
            entities: [
                UserEntity,
                ImageEntity
            ],
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
        };
    },
};
