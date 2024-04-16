import { NextFunction, Request, Response } from "express";

import { userRepository } from "../repositories";
import { CustomError, errorHandlerWrapper } from "../utils";
import { User } from "../entity";
export class UserController {
  static all = errorHandlerWrapper(
    async (request: Request, response: Response) => {
      const data = await userRepository.findAll(request.query);

      return response.status(200).send(data);
    }
  );

  static create = errorHandlerWrapper(
    async (request: Request, response: Response) => {
      const data = await userRepository.createUser(request.body);

      return response.status(201).send(data);
    }
  );

  static findOne = errorHandlerWrapper(
    async (request: Request, response: Response, next: NextFunction) => {
      const id = String(request.params.id);
      const data = await userRepository.findOne(id);
      if (!data) {
        const error = new CustomError(
          `User with the Id of ${id} is not found`,
          404
        );
        return next(error);
      }

      return response.send(data);
    }
  );

  static update = errorHandlerWrapper(
    async (request: Request, response: Response, next: NextFunction) => {
      const id = String(request.params.id);
      const user = await userRepository.findOne(id);
      if (!user) {
        const error = new CustomError(
          `User with the Id of ${id} is not available`,
          404
        );
        return next(error);
      }
      const data = (await userRepository.updateUser(id, request.body)) as User;

      return response.send(data);
    }
  );

  static delete = errorHandlerWrapper(
    async (request: Request, response: Response, next: NextFunction) => {
      const id = String(request.params.id);
      const user = await userRepository.findOne(id);
      if (!user) {
        const error = new CustomError(
          `User with the Id of ${id} is not available`,
          404
        );
        return next(error);
      }
      const data = await userRepository.delete(id);
      return response.send(data);
    }
  );
}
