import {IErrorResponse} from '../interfaces/error'
import {ErrorResponse as Error} from '../utils/error'

export const errorResponse = (err: Error, req: any, res: any, next: any): Promise<IErrorResponse> => {
    return res.status(err.statusCode || 500).json({ 
        success: false, 
        error: err.message || 'Server Error',
        statusCode: err.statusCode || 500,
        path: err.path
    })
}