import { Router } from 'express';
import PostController from '../controller/post';
import checkToken from '../middleware/verifyToken';

const postRouter = Router();
const controller: PostController = new PostController();

postRouter.get('/:id', checkToken, controller.getUserPosts.bind(controller));
postRouter.get('', checkToken, controller.getAll.bind(controller));

export default postRouter;