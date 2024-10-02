import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PinModule } from './modules/pin/pin.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        AuthModule,
        UserModule,
        PinModule,
    ],
})
export class AppModule {}
