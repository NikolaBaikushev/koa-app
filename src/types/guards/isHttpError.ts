import { CustomHttpError } from '../../common/HttpError';

export const isHttpError = (err: unknown): err is CustomHttpError => {
    return (
        typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    typeof (err as any).status === 'number' &&
    'message' in err &&
    typeof (err as any).message === 'string'
    );
};

