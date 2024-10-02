import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IAuthUseCase } from "@auth/domain/use-case";
import { GetCurrentUser } from "@common/decorators";
import { authBodyDto, JwtPayloadDto } from "@auth/domain/dto";

@Controller('auth')
export class AuthController
{
    constructor(
        @Inject(IAuthUseCase)
        private readonly authUseCase: IAuthUseCase
    ){}

    @Post()
    async auth(
        @GetCurrentUser() userToken: JwtPayloadDto,
        @Body() authBody: authBodyDto
    ): Promise<void>
    {
        await this.authUseCase.authPinterest(userToken.userId, authBody.code);
    }
}