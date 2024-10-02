import { HttpStatusCode } from './http-status';

/**
 * Http status messages dictionary.
 */
export const HttpStatusMessage: Record<HttpStatusCode, string> = {
    [HttpStatusCode.CONTINUE]: 'Continue',
    [HttpStatusCode.SWITCHING_PROTOCOLS]: 'Switching protocols',
    [HttpStatusCode.PROCESSING]: 'Processing',
    [HttpStatusCode.EARLYHINTS]: 'Earlyhints',
    [HttpStatusCode.OK]: 'Ok',
    [HttpStatusCode.CREATED]: 'Created',
    [HttpStatusCode.ACCEPTED]: 'Accepted',
    [HttpStatusCode.NON_AUTHORITATIVE_INFORMATION]:
        'Non authoritative information',
    [HttpStatusCode.NO_CONTENT]: 'No content',
    [HttpStatusCode.RESET_CONTENT]: 'Reset content',
    [HttpStatusCode.PARTIAL_CONTENT]: 'Partial content',
    [HttpStatusCode.AMBIGUOUS]: 'Ambiguous',
    [HttpStatusCode.MOVED_PERMANENTLY]: 'Moved permanently',
    [HttpStatusCode.FOUND]: 'Found',
    [HttpStatusCode.SEE_OTHER]: 'See other',
    [HttpStatusCode.NOT_MODIFIED]: 'Not modified',
    [HttpStatusCode.TEMPORARY_REDIRECT]: 'Temporary redirect',
    [HttpStatusCode.PERMANENT_REDIRECT]: 'Permanent redirect',
    [HttpStatusCode.BAD_REQUEST]: 'Bad request',
    [HttpStatusCode.UNAUTHORIZED]: 'Unauthorized',
    [HttpStatusCode.PAYMENT_REQUIRED]: 'Payment required',
    [HttpStatusCode.FORBIDDEN]: 'Forbidden',
    [HttpStatusCode.NOT_FOUND]: 'Not found',
    [HttpStatusCode.METHOD_NOT_ALLOWED]: 'Method not allowed',
    [HttpStatusCode.NOT_ACCEPTABLE]: 'Not acceptable',
    [HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED]:
        'Proxy authentication required',
    [HttpStatusCode.REQUEST_TIMEOUT]: 'Request timeout',
    [HttpStatusCode.CONFLICT]: 'Conflict',
    [HttpStatusCode.GONE]: 'Gone',
    [HttpStatusCode.LENGTH_REQUIRED]: 'Length required',
    [HttpStatusCode.PRECONDITION_FAILED]: 'Precondition failed',
    [HttpStatusCode.PAYLOAD_TOO_LARGE]: 'Payload too large',
    [HttpStatusCode.URI_TOO_LONG]: 'URI too long',
    [HttpStatusCode.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported media type',
    [HttpStatusCode.REQUESTED_RANGE_NOT_SATISFIABLE]:
        'Requested range not satisfiable',
    [HttpStatusCode.EXPECTATION_FAILED]: 'Expectation failed',
    [HttpStatusCode.I_AM_A_TEAPOT]: 'I am a teapot',
    [HttpStatusCode.MISDIRECTED]: 'Misdirected',
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
    [HttpStatusCode.FAILED_DEPENDENCY]: 'Failed dependency',
    [HttpStatusCode.PRECONDITION_REQUIRED]: 'Precondition required',
    [HttpStatusCode.TOO_MANY_REQUESTS]: 'Too many requests',
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
    [HttpStatusCode.NOT_IMPLEMENTED]: 'Not implemented',
    [HttpStatusCode.BAD_GATEWAY]: 'Bad Gateway',
    [HttpStatusCode.SERVICE_UNAVAILABLE]: 'Service unavailable',
    [HttpStatusCode.GATEWAY_TIMEOUT]: 'Gateway timeout',
    [HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
} as const;
