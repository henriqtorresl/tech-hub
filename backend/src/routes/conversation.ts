import { Router } from 'express';
import ConversationController from '../controller/conversation';

const conversationRouter = Router();
const controller = new ConversationController();


export default conversationRouter;