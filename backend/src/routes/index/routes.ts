import { Router } from 'express';
import authRouter from '../auth';
import userRouter from '../user';
import postRouter from '../posts';
import conversationRouter from '../conversation';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);
routes.use('/post', postRouter);
routes.use('/conversation', conversationRouter);

export default routes;