interface Error {
    status?: number;
    code?: number;
    name: string;
    message: string;
    stack?: string;
}
export const createError = (status: number, message: string) => {
    const err: Error = new Error()
    err.status = status;
    err.message = message
    return err;
}