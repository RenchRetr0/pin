import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto } from '@pin/domain/dto';
import { IGetUserUseCase } from '@user/domain/use-case/get';
import { ICreatePinUseCase } from './i-create-pin.use-case';

@Injectable()
export class CreatePinUseCase implements ICreatePinUseCase {
    constructor(
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase,
    ) {}

    async createPin(
        userId: number,
        createImageDto: CreateImageDto,
    ): Promise<void> {
        try {
            const userModel = await this.getUserUseCase.getById(userId);
            const bodyString = {
                title: createImageDto.title,
                description: createImageDto.description ?? null,
                media_source: {
                    source_type: 'image_url',
                    url: createImageDto.imageUrl,
                },
            };
            const result = await fetch('https://api.pinterest.com/v5/pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer AEASL5YWADH3UAYAGBAFKDDRNUUE5EQBACGSOSJG44YDXXTU64C7WZ6742HC74QSXS3254NRW74TFUQCQDAPUEEVG6M6IZIA`,
                },
                body: JSON.stringify(bodyString),
            });
            console.log(await result.json());
        } catch (error) {
            console.error(error);
        }
    }
}
