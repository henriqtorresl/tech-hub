export interface Conversation {
    id_conversa: number;
    id_usuario_remetente: number;
    id_usuario_destinatario: number;
    nome_usuario_destinatario: string;
}

export interface CreateConversation {
    usuario_1: number;
    usuario_2: number;
}

export interface CreateConversationResponse {
    msg: string;
}