import express from "express";
import userRouter from "./user.router";

// import { validateJwt } from "../../middlewares";

export const public_api = express.Router();

public_api.use("/users", userRouter);
