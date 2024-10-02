import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IUpdateUserUseCase } from "@user/domain/use-case/update";
import { ResponserPinterestDto } from "../dto";
import { IAuthUseCase } from "./i-auth.use-case";

@Injectable()
export class AuthUseCase implements IAuthUseCase
{
    constructor(
        @Inject(ConfigService)
        private readonly config: ConfigService,
        @Inject(IUpdateUserUseCase)
        private readonly updateUserUseCase: IUpdateUserUseCase
    ){}

    async authPinterest(userId: number, code: string): Promise<any>
    {
        try
        {
            const result = await fetch('https://api.pinterest.com/v5/oauth/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${await this.getBaseString()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'grant_type': 'authorization_code',
                    'code': `${code}`,
                    'redirect_uri': 'https://super-smm.com'
                }).toString()
            });

            const responsePinterestDto: ResponserPinterestDto = await result.json();
            await this.updateUserUseCase.update(userId, {refreshToken: responsePinterestDto.refresh_token, accessToken: responsePinterestDto.access_token});
        }
        catch(error)
        {
            console.error(error);
        }
    }

    private async getBaseString(): Promise<string>
    {
        return Buffer.from(`${this.config.get<string>('CLIENTID')}:${this.config.get<string>('CLIENTTOKEN')}`).toString('base64');
    }

    private async getParamsBody(code: string): Promise<URLSearchParams>
    {
        return new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://super-smm.com'
        });
    }
}