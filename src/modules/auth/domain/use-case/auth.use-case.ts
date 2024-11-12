import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUpdateUserUseCase } from '@user/domain/use-case/update';
import {
    JwtPayloadDto,
    RequestRefreshTokenDto,
    ResponserPinterestDto,
} from '../dto';
import { IAuthUseCase } from './i-auth.use-case';
import { IGetUserUseCase } from '@user/domain/use-case/get';
import { AuthBarRequest } from '../error';

@Injectable()
export class AuthUseCase implements IAuthUseCase {
    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
        @Inject(JwtService)
        private readonly jwtService: JwtService,
        @Inject(IUpdateUserUseCase)
        private readonly updateUserUseCase: IUpdateUserUseCase,
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase,
    ) {}

    async getAccessToken(login: string): Promise<string> {
        const userModel = await this.getUserUseCase.getByLogin(login);
        if (!userModel) throw new AuthBarRequest();
        try {
            return await this.generateToken({ userId: userModel.id });
        } catch (error) {
            console.log(error.message);
            throw new AuthBarRequest();
        }
    }

    async authPinterest(userId: number, code: string): Promise<string> {
        try {
            const bodyAuth = await this.getParamsBody(code);
            const result = await await this.requestPinterest(
                bodyAuth.toString(),
            );

            const responsePinterestDto: ResponserPinterestDto =
                await result.json();
            await this.updateUserUseCase.update(userId, {
                refreshToken: responsePinterestDto.refresh_token,
                accessToken: responsePinterestDto.access_token,
            });
            return await this.getUsernamePinterest(
                responsePinterestDto.access_token,
            );
        } catch (error) {
            console.error(error);
            throw new AuthBarRequest();
        }
    }

    async refreshToken(userId: number): Promise<void> {
        const userModel = await this.getUserUseCase.getById(userId);
        try {
            const bodyRefreshToken = await this.getParamBodyRefreshToken(
                userModel.refreshToken,
            );
            const result = await this.requestPinterest(
                bodyRefreshToken.toString(),
            );
            const requestRefreshToken: RequestRefreshTokenDto =
                await result.json();
            await this.updateUserUseCase.update(userId, {
                refreshToken: requestRefreshToken.refresh_token,
                accessToken: requestRefreshToken.access_token,
            });
        } catch (error) {
            console.error(error);
            throw new AuthBarRequest();
        }
    }

    private async generateToken(jwtToken: JwtPayloadDto): Promise<string> {
        const payload = { jwtToken };
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('APP_SECRET_TOKEN'),
        });
    }

    private async requestPinterest(body: string): Promise<Response> {
        return await fetch(
            `${this.configService.get<string>('PINTDOMAIN')}/oauth/token`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${await this.getBaseString()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body,
            },
        );
    }

    private async getUsernamePinterest(authToken: string): Promise<string> {
        const bodyPinterestJson = await fetch(
            `${this.configService.get<string>('PINTDOMAIN')}/user_account?`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            },
        );
        const bodyPinterest = await bodyPinterestJson.json();
        return bodyPinterest.username;
    }

    private async getBaseString(): Promise<string> {
        return Buffer.from(
            `${this.configService.get<string>(
                'CLIENTID',
            )}:${this.configService.get<string>('CLIENTTOKEN')}`,
        ).toString('base64');
    }

    private async getParamsBody(code: string): Promise<URLSearchParams> {
        return new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://super-smm.com',
        });
    }

    private async getParamBodyRefreshToken(
        userRefreshToken: string,
    ): Promise<URLSearchParams> {
        return new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: userRefreshToken,
            scope: 'boards:read,pins:read,ads:read,pins:write,boards:write',
            refresh_on: 'true',
        });
    }
}
