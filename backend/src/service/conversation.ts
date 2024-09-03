import { Conversation, ConversationResponse } from '../interfaces/conversation';
import ConversationRepository from '../repository/conversation';
import UserService from './user';

export default class ConversationService {

    private repository: ConversationRepository;
    private userService: UserService;

    constructor() {
        this.repository = new ConversationRepository();
        this.userService = new UserService();
    }

    async getConversations(idUser: string): Promise<ConversationResponse[]> {
        let conversations: Conversation[] = await this.repository.getConversations(idUser);

        const response = await Promise.all(conversations.map(async (c) => {
            let nomeDestinatario: string;
            let idUserRemetente: number;
            let idUserDestinatario: number;

            if (c.id_usuario_1.toString() !== idUser) {
                nomeDestinatario = await this.userService.getName(c.id_usuario_1);
                idUserDestinatario = c.id_usuario_1;
                idUserRemetente = c.id_usuario_2;
            } else {
                nomeDestinatario = await this.userService.getName(c.id_usuario_2);
                idUserDestinatario = c.id_usuario_2;
                idUserRemetente = c.id_usuario_1;
            }

            const conversation: ConversationResponse = {
                id_conversa: c.id_conversa,
                id_usuario_remetente: idUserRemetente,
                id_usuario_destinatario: idUserDestinatario,
                nome_usuario_destinatario: nomeDestinatario
            };

            return conversation;
        }));

        return response;
    }

}
