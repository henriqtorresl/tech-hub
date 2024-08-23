import { Request, Response } from "express";
import AuthService from "../service/auth";
import { LoginBody, RegisterBody } from "../interfaces/auth";
import UsuarioRepository from "../repository/usuario";
import { Usuario } from "../interfaces/usuario";
import jwt from 'jsonwebtoken';

export default class AuthController {

    private service: AuthService;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.service = new AuthService();
        this.usuarioRepository = new UsuarioRepository();
    }

    async register(req: Request, res: Response) {
        try {

            const usuarios: Usuario[] = await this.usuarioRepository.getRegistredUsers();
            const body: RegisterBody = req.body;

            // Verifique se o telefone, e-mail ou CPF já está registrado
            for (const u of usuarios) {
                if (u.telefone === body.phone) {
                    return res.status(422).json({ msg: 'Por favor utilize outro telefone!' });
                }
                if (u.email === body.email) {
                    return res.status(422).json({ msg: 'Por favor utilize outro e-mail!' });
                }
                if (u.cpf === body.cpf) {
                    return res.status(422).json({ msg: 'Por favor utilize outro CPF!' });
                }
            }

            // Verifique se todos os campos obrigatórios estão presentes
            if (!body.name) {
                return res.status(422).json({ msg: 'O nome é obrigatório!' });
            }
            if (!body.password) {
                return res.status(422).json({ msg: 'A senha é obrigatória!' });
            }
            if (!body.cpf) {
                return res.status(422).json({ msg: 'O cpf é obrigatório!' });
            }
            if (!body.email) {
                return res.status(422).json({ msg: 'O e-mail é obrigatório!' });
            }
            if (!body.phone) {
                return res.status(422).json({ msg: 'O telefone é obrigatório!' });
            }

            await this.service.register(body);
            return res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }
    }

    async login(req: Request, res: Response) {
        const body: LoginBody = req.body;

        // Verifique se todos os campos obrigatórios estão presentes
        if (!body.password) {
            return res.status(422).json({ msg: 'A senha é obrigatória!' });
        }
        if (!body.cpf) {
            return res.status(422).json({ msg: 'O cpf é obrigatório!' });
        }

        try {
            const usuario: Usuario = await this.usuarioRepository.getUserByCpf(body.cpf);

            if (!usuario) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }

            const userPassword: string = this.service.decrypt(usuario.senha);

            if (body.password != userPassword) {
                return res.status(404).json({ msg: 'Senha inválida!' });
            }

            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: usuario.id_usuario
                }
                , secret!
            );

            res.status(200).json(
                {
                    msg: 'Logado com sucesso!',
                    token: token,
                    usuario: usuario
                }
            );
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }

    }

}