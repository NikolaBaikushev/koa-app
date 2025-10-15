export function formatUnknownError(err: unknown): object | string {
    const isDev = process.env.NODE_ENV === 'development';

    if (err instanceof Error) {
        if (isDev) {
            return {
                name: err.name,
                message: err.message,
                stack: err.stack,
            };
        }
    }

    if (typeof err === 'object' && err !== null) {
        return isDev ? err : 'Internal server error';
    }

    return isDev ? String(err) : 'Internal server error';
}