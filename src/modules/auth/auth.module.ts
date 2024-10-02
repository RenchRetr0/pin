import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './domain/strategy';
import { AuthProvider } from './dependency-injection';
import { AuthController } from './api';
import { UserModule } from '@user/user.module';

@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        UserModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        JwtAuthGuard,
        AuthProvider
    ]
})
export class AuthModule {}
