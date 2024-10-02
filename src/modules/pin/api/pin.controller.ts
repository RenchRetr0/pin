import { JwtPayloadDto } from '@auth/domain/dto';
import { GetCurrentUser } from '@common/decorators';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateImageDto } from '@pin/domain/dto';
import { ICreatePinUseCase } from '@pin/domain/use-case/pin/create';

@Controller('pin')
export class PinController {
    constructor(
        @Inject(ICreatePinUseCase)
        private readonly createPinUseCase: ICreatePinUseCase,
    ) {}

    @Post()
    async createPin(
        @GetCurrentUser() userToken: JwtPayloadDto,
        @Body() createImageDto: CreateImageDto,
    ): Promise<void> {
        await this.createPinUseCase.createPin(userToken.userId, createImageDto);
    }
}
