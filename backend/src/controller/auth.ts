import { Request, Response } from 'express';
import AuthService from '../service/auth';
import { LoginBody, RegisterBody } from '../interfaces/auth';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/user';
import { User } from '../interfaces/user';

export default class AuthController {

    private service: AuthService;
    private userRepository: UserRepository;

    constructor() {
        this.service = new AuthService();
        this.userRepository = new UserRepository();
    }

    async register(req: Request, res: Response) {
        try {

            const usuarios: User[] = await this.userRepository.getRegistredUsers();
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
            const user: User = await this.userRepository.getUserByCpf(body.cpf);

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }

            const userPassword: string = this.service.decrypt(user.senha);

            if (body.password != userPassword) {
                return res.status(404).json({ msg: 'Senha inválida!' });
            }

            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: user.id_usuario
                }
                , secret!
            );

            res.status(200).json(
                {
                    msg: 'Logado com sucesso!',
                    token: token,
                    usuario: user
                }
            );
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }

    }

}