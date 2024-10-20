import { HttpException } from '@nestjs/common';
import { HttpStatusMessage } from '@common/enums';
import { HttpStatusCode } from '@common/enums/http-status';

export class BoardNotFound extends HttpException {
    constructor() {
        super(
            { message: HttpStatusMessage[HttpStatusCode.NOT_FOUND] },
            HttpStatusCode.NOT_FOUND,
        );
    }
}
