import { Result } from "express-validator";

export default (errors: Result) => {
    const error: ResponseError = new Error('Validation failed');
    error.code = 422;
    error.data = errors.array();
    return error;
}