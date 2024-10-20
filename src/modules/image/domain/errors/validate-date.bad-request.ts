import { HttpException } from '@nestjs/common';
import { HttpStatusCode } from '@common/enums/http-status';

export class ValidateDateBarRequest extends HttpException {
    constructor() {
        super(
            { message: 'The date must be tomorrow or later.' },
            HttpStatusCode.BAD_REQUEST,
        );
    }
}
