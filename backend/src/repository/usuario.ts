import { connection } from "../config/connection";
import { RegisterBody } from "../interfaces/auth";
import { Usuario } from "../interfaces/usuario";

export default class UsuarioRepository {

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
        let usuarios: Usuario[] = [];
        const sql = `
            SELECT cpf, email, telefone FROM usuario u;
        `;

        try {
            client = await connection();
            const response = await client.query(sql);
            usuarios = response.rows;
        } catch (err) {
            console.error('\nErro ao criar usuario:', err);
        } finally {
            if (client) client.release();
            return usuarios;
        }
    }

    async getUserByCpf(cpf: string) {
        let client: any;
        let usuario: any;
        const sql = `
            SELECT * FROM usuario u 
            WHERE cpf = $1;
        `;
        const values = [cpf];

        try {
            client = await connection();
            const response = await client.query(sql, values);
            usuario = response.rows[0];
        } catch (err) {
            console.error('\nErro ao criar usuario:', err);
        } finally {
            if (client) client.release();
            return usuario;
        }
    }

}