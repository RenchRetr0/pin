import { HttpException } from '@nestjs/common';
import { HttpStatusCode } from '@common/enums/http-status';
import { HttpStatusMessage } from '@common/enums/http-status-message.enum';

export class BoardBarRequest extends HttpException {
    constructor() {
        super(
            { message: HttpStatusMessage[HttpStatusCode.BAD_REQUEST] },
            HttpStatusCode.BAD_REQUEST,
        );
    }
}