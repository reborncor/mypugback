import { Router } from "express";
import userRouter from "./userRoutes";
import pugRouter from "./pugRoutes";
import conversationRouter from "./conversationRoute";
import signalRouter from "./signalRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/pug", pugRouter);
router.use("/conversation", conversationRouter);
router.use("/signal", signalRouter);

export default router;
