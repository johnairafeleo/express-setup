import { AppDataSource } from "../data-source";
import { User } from "../entity";
import { UserService } from "../services/user.service";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);
