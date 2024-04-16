import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

import { CustomError, errorMessage } from '../utils';

const devErrors = (res: Response, error: CustomError) => {
  res
    .status(error.statusCode)
    .json(errorMessage(error.message, error.statusCode));
};

const castErrorHandler = (err: any) => {
  const msg = `Invalid value for ${err.path}: ${err.value}!`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (_err: any) => {
  const msg = `Bad Request Duplicate Value Error`;

  return new CustomError(msg, 400);
};

const validationErrorHandler = (err: any) => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const errorMessages = errors.join('. ');
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const prodErrors = (res: Response, error: CustomError) => {
  if (error.isOperational) {
    res
      .status(error.statusCode)
      .json(errorMessage(error.message, error.statusCode));
  } else {
    res
      .status(500)
      .json(errorMessage('Something went wrong! Please try again later', 500));
  }
};

export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devErrors(res, error);
    console.log(error);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') error = castErrorHandler(error);
    if (
      error.message.includes('duplicate key value violates unique constraint')
    ) {
      error = duplicateKeyErrorHandler(error);
    }
    if (error.name === 'ValidationError') error = validationErrorHandler(error);

    prodErrors(res, error);
  }
};
