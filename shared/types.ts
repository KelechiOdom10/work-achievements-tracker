export type SuccessResponse<T = void> = {
    success: boolean;
    message: string;
} & (T extends void ? {} : { data: T });


export type ErrorResponse = {
    success: boolean;
    message: string;
    error: string;
    isFormError?: boolean;
}
    