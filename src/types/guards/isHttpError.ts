import { HttpError } from "../../services/authService";

export const isHttpError = (err: unknown): err is HttpError => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    typeof (err as any).status === 'number' &&
    'message' in err &&
    typeof (err as any).message === 'string'
  );
};

