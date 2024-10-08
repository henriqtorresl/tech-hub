export interface Conversation {
    id_conversa: number;
    id_usuario_1: number;
    id_usuario_2: number;
}

export interface ConversationResponse {
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
    id_conversa: number;
}