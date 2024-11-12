import { HttpException } from '@nestjs/common';
import { HttpStatusCode } from '@common/enums/http-status';
import { HttpStatusMessage } from '@common/enums/http-status-message.enum';

export class UserBarRequest extends HttpException {
    constructor(message: string | void) {
        super(
            {
                message:
                    message ?? HttpStatusMessage[HttpStatusCode.BAD_REQUEST],
            },
            HttpStatusCode.BAD_REQUEST,
        );
    }
}
