import { NextFunction, Request, Response } from 'express';
import { validate as isUuid } from 'uuid';

import { errorMessage } from '../utils';

export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  if (id && !isUuid(id)) {
    return res.status(400).json(errorMessage('Invalid UUID'));
  }
  next();
};

export const validateSecondUUID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { otherId } = req.params;
  if (otherId && !isUuid(otherId)) {
    return res.status(400).json(errorMessage('Invalid UUID'));
  }
  next();
};
export const validateCompanyUUid = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { companyId } = req.params;
  if (companyId && !isUuid(companyId)) {
    return res.status(400).json(errorMessage('Invalid UUID'));
  }
  next();
};

export const validateDynamicUUIDParams =
  (paramNames: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    for (const paramName of paramNames) {
      const paramValue = req.params[paramName];

      if (!isUuid(paramValue)) {
        return res
          .status(400)
          .json(errorMessage(`Invalid UUID for parameter: ${paramName}`));
      }
    }

    next();
  };
