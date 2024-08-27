import { Router } from 'express';
import UserController from '../controller/user';
import checkToken from '../middleware/verifyToken';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/personal-data/:id', checkToken, userController.getPersonalData.bind(userController));

export default userRouter;