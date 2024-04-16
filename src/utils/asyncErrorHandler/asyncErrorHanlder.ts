import { NextFunction, Request, Response } from 'express';

export const errorHandlerWrapper = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => next(err));
  };
};
