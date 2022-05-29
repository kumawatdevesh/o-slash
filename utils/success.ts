import { ISuccessResponse } from "../interfaces/success"

class SuccessResponse {

    public code: number
    public message: string
    public data: any
    public success: boolean

    constructor(response: ISuccessResponse) {
        this.code = response.code
        this.message = response.message
        this.data = response.data
        this.success = response.success
    }
}

export {
    SuccessResponse
}