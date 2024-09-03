import { connection } from '../config/connection';
import { RegisterBody } from '../interfaces/auth';
import { User } from '../interfaces/user';

export default class UserRepository {

    constructor() {}

    async createUser(body: RegisterBody) {
        let client: any;
        const sql = `
            INSERT INTO usuario (nome, senha, cpf, email, telefone) 
            VALUES ($1, $2, $3, $4, $5);
        `;
        const values = [body.name, body.password, body.cpf, body.email, body.phone];
    
        try {
            client = await connection();
            await client.query(sql, values);
        } catch (err) {
            console.error('\nErro ao criar usuario:', err);
        } finally {
            if (client) client.release();
        }
    }

    async getRegistredUsers() {
        let client: any;
        let users: User[] = [];
        const sql = `
            SELECT cpf, email, telefone FROM usuario u;
        `;

        try {
            client = await connection();
            const response = await client.query(sql);
            users = response.rows;
        } catch (err) {
            console.error('\nErro ao buscar usuarios:', err);
        } finally {
            if (client) client.release();
            return users;
        }
    }

    async getUserByCpf(cpf: string) {
        let client: any;
        let user: any;
        const sql = `
            SELECT * FROM usuario u 
            WHERE cpf = $1;
        `;
        const values = [cpf];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            user = response.rows[0];
        } catch (err) {
            console.error('\nErro ao buscar usuario:', err);
        } finally {
            if (client) client.release();
            return user;
        }
    }

    async getPersonalData(idUser: string) {
        let client: any;
        let user: any;
        const sql = `
            SELECT * FROM usuario u 
            WHERE id_usuario = $1;
        `;
        const values = [idUser];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            user = response.rows[0];
        } catch (err) {
            console.error('\nErro ao buscar usuario:', err);
        } finally {
            if (client) client.release();
            return user;
        }
    }

    async getName(idUser: number) {
        let client: any;
        let name: string;
        const sql: string = `
            SELECT nome FROM usuario u WHERE id_usuario = $1;
        `;
        const values = [idUser];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            name = response.rows[0].nome;
        } catch (err) {
            console.error('\nErro ao buscar o nome usuario:', err);
        } finally {
            if (client) client.release();
            return name!;
        }
    }

}