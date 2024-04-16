import { Router } from "express";

import { validateUUID } from "../../middlewares";
import { UserController } from "../../controllers";

const userRouter = Router();
userRouter.get("", UserController.all);
userRouter.post("/", UserController.create);
userRouter.get("/:id", validateUUID, UserController.findOne);
userRouter.put("/:id", validateUUID, UserController.update);
userRouter.delete("/:id", validateUUID, UserController.delete);

export default userRouter;
