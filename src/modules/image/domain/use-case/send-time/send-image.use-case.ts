import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IGetImagesUseCase } from '../get/images';
import { IRequestPinUseCase } from '../request-pint';
import { ISendImageUseCase } from './i-send-image.use-case';

@Injectable()
export class SendImageUseCase implements ISendImageUseCase {
    constructor(
        @Inject(IGetImagesUseCase)
        private readonly getImagesUseCase: IGetImagesUseCase,
        @Inject(IRequestPinUseCase)
        private readonly requestPinUseCase: IRequestPinUseCase,
    ) {}

    @Cron('30 * * * * *')
    async sendImage(): Promise<void> {
        const imagesModel = await this.getImagesUseCase.getAllSendImageTime();
        if (imagesModel.length > 0) {
            for (let imageModel of imagesModel) {
                await this.requestPinUseCase.requestSave(imageModel.id);
            }
        }
    }
}
