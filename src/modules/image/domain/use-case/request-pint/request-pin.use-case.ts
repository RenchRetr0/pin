import { Inject, Injectable } from '@nestjs/common';
import { IGetImageUseCase } from '../get/image';
import { ConfigService } from '@nestjs/config';
import { IRequestPinUseCase } from './i-request-pin.use-case';
import { IUpdateImageUseCase } from '../update';

@Injectable()
export class RequestPinUseCase implements IRequestPinUseCase {
    constructor(
        @Inject(IGetImageUseCase)
        private readonly getImageUseCase: IGetImageUseCase,
        @Inject(IUpdateImageUseCase)
        private readonly updateImageUseCase: IUpdateImageUseCase,
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {}

    async requestSave(imageId: number): Promise<void> {
        const imageModel = await this.getImageUseCase.getWithUser(imageId);
        try {
            const bodyString = {
                title: imageModel.title,
                description: imageModel.description ?? null,
                board_id: imageModel.board.boardId,
                media_source: {
                    source_type: 'image_url',
                    url: imageModel.imageUrl,
                },
            };
            await fetch(
                `${this.configService.get<string>('PINTDOMAIN')}/pins`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${imageModel.board.user.accessToken}`,
                    },
                    body: JSON.stringify(bodyString),
                },
            );
        } catch (error) {
            console.error(error.message);
            await this.updateImageUseCase.updateStatus(imageId, {
                errorMessage: error.message,
                isStatus: false,
            });
        }
    }
}
