import { connection } from '../config/connection';
import { CreateConversationResponse } from '../interfaces/conversation';

export default class ConversationRepository {

    constructor() {}

    async getConversations(idUser: string) {
        let client: any;
        let conversation: any;
        const sql = `
            SELECT * FROM conversa c 
            WHERE c.id_usuario_1 = $1 OR c.id_usuario_2 = $1;
        `;
        const values = [idUser];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            conversation = response.rows;
        } catch (err) {
            console.error('\nErro ao buscar usuario:', err);
        } finally {
            if (client) client.release();
            return conversation;
        }
    }

    async insertIfNotExists(idUser1: number, idUser2: number): Promise<CreateConversationResponse> {
        let client: any;
        let createConversationResponse: CreateConversationResponse;
        // Chama uma procedure que eu criei no banco:
        const sql = `
            SELECT criar_conversa($1, $2) AS msg;
        `;
        const values = [idUser1, idUser2];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            createConversationResponse = response.rows[0];
        } catch (err) {
            console.error('\nErro ao criar conversas:', err);
        } finally {
            if (client) client.release();
            return createConversationResponse!;
        }
    }

}