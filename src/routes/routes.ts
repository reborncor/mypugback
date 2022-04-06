import {Router} from "express";
import userRouter from "./userRoutes";
import pugRouter from "./pugRoutes";


const router = Router();

router.use('/user', userRouter);
router.use('/pug', pugRouter);


export default router
