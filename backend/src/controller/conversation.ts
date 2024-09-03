import { Request, Response } from 'express';
import ConversationService from '../service/conversation';
import { ConversationResponse } from '../interfaces/conversation';

export default class ConversationController {

    private service: ConversationService;

    constructor() {
        this.service = new ConversationService();
    }

    async getConversations(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const conversation: ConversationResponse[] = await this.service.getConversations(id);

            if (conversation.length == 0) {
                return res.status(404).json({ msg: 'Não foi encontrada nenhuma conversa!' });
            }

            return res.status(200).json(conversation);
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }
    }

}