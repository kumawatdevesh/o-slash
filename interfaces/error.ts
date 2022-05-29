interface IError {
    message: string
    statusCode: number
    path: string
}

interface IErrorResponse {
    success: boolean
    error: string
    statusCode: number,
    path: string
}

export {
    IError,
    IErrorResponse
}