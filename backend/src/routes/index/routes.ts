import { Router } from 'express';
import authRouter from '../auth';
import userRouter from '../user';
import postRouter from '../posts';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);
routes.use('/post', postRouter);

export default routes;