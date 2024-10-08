import { Router } from 'express';
import ConversationController from '../controller/conversation';
import checkToken from '../middleware/verifyToken';

const conversationRouter = Router();
const controller = new ConversationController();

conversationRouter.get('', controller.getOne.bind(controller));
conversationRouter.get('/user/:id', checkToken, controller.getConversations.bind(controller));
conversationRouter.post('', checkToken, controller.insertIfNotExists.bind(controller));

export default conversationRouter;