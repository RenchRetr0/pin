import { Injectable } from '@nestjs/common';
import { IValidateDateUseCase } from './i-validate-date.use-case';
import { ValidateDateBarRequest } from '@image/domain/errors';

@Injectable()
export class ValidateDateUseCase implements IValidateDateUseCase {
    async validateDateAndTime(dateTime: Date): Promise<void> {
        const messageDate = new Date(dateTime).getTime();
        const nowDate = new Date().getTime() + 5 * 60 * 1000;
        if (nowDate > messageDate) throw new ValidateDateBarRequest();
    }
}
