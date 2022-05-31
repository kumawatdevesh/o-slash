import { IErrorResponse } from "../interfaces/error";

class ErrorResponse extends Error {

    public statusCode: number
    public path: string
    public success: boolean

    constructor(response: IErrorResponse) {
        super(response.error);
        this.statusCode = response.statusCode
        this.path = response.path
        this.success = response.success
    }
}

export {
    ErrorResponse
}