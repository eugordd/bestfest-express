declare namespace Express {
    export interface Request {
        adminId?: string
        userId?: string
    }
}

interface ResponseError extends Error {
    code?: number
    data?: object
}
