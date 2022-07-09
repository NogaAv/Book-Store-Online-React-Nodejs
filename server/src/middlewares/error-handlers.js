import { ErrorResponse } from '../models/response.model.js';

export function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
export function clientErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.statusCode === 500
        ? res.send(new ErrorResponse(res.statusCode, 'Internal Server Error', 'Something went wrong'))
        : res.send(err.message);
}

export function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
