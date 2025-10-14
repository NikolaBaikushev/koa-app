
type ErrorResponse = {
    success: false;
    status: number;
    message: string;
    errors: unknown; 
    data?: never;
};

type FailResponse = {
    success: false;
    status: number;
    message: string;
    data?: never;
    errors?: never; 
};

type SuccessResponse<T> = {
    success: true;
    status: number;
    message: string;
    data: T;
    errors?: never;
};


export function createErrorResponse(status: number, message: string, errors: unknown): ErrorResponse {
    return { success: false, status, message, errors };
}

export function createFailResponse(status: number, message: string): FailResponse {
    return { success: false, status, message };
}

export function createSuccessResponse<T>(status: number, message: string, data: T): SuccessResponse<T> {
    return { success: true, status, message, data };
}
