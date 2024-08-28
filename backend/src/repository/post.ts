import { connection } from '../config/connection';
import { Post } from '../interfaces/post';

export default class PostRepository {

    constructor() {}

    async getUserPosts(idUser: string) {
        let posts: Post[] = [];
        let client: any;
        const sql: string = `
            SELECT p.id_publicacao, p.id_usuario, p.titulo, p.conteudo, COUNT(c.id_comentario) AS qnt_comentarios, COUNT(ct.id_curtida) AS qnt_curtidas 
            FROM publicacao p
            LEFT JOIN comentario c USING(id_publicacao)
            LEFT JOIN curtida ct USING(id_publicacao)
            WHERE p.id_usuario = $1
            GROUP BY p.id_publicacao
            ORDER BY id_publicacao DESC;
        `;
        const values = [idUser];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            posts = response.rows;
        } catch (err) {
            console.error('\nErro ao buscar as publicações do usuario:', err);
        } finally {
            if (client) client.release();
            return posts;
        }
    }

    async getAll() {
        let posts: Post[] = [];
        let client: any;
        const sql: string = `
            SELECT p.id_publicacao, p.id_usuario, u.nome AS nome_usuario, p.titulo, p.conteudo, count(c.id_comentario) AS qnt_comentarios, count (ct.id_curtida) AS qnt_curtidas 
            FROM publicacao p
            LEFT JOIN usuario u USING(id_usuario)
            LEFT JOIN comentario c USING(id_publicacao)
            LEFT JOIN curtida ct USING(id_publicacao)
            GROUP BY p.id_publicacao, u.id_usuario
            ORDER BY id_publicacao DESC;
        `;

        try {
            client = await connection();
            const response = await client.query(sql);
            posts = response.rows;
        } catch (err) {
            console.error('\nErro ao buscar as publicações:', err);
        } finally {
            if (client) client.release();
            return posts;
        }
    }

}