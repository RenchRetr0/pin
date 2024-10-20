import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthUseCase } from '@auth/domain/use-case';
import { GetCurrentUser } from '@common/decorators';
import { authBodyDto, JwtPayloadDto } from '@auth/domain/dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(IAuthUseCase)
        private readonly authUseCase: IAuthUseCase,
    ) {}

    @Post()
    @ApiResponse({ status: 200, description: 'Authentication was successful' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async auth(
        @GetCurrentUser() userToken: JwtPayloadDto,
        @Body() authBody: authBodyDto,
    ): Promise<void> {
        await this.authUseCase.authPinterest(userToken.userId, authBody.code);
    }

    @Post('refresh')
    @ApiResponse({ status: 200, description: 'Authentication was successful' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async authRefresh(
        @GetCurrentUser() userToken: JwtPayloadDto,
    ): Promise<void> {
        await this.authUseCase.refreshToken(userToken.userId);
    }
}
