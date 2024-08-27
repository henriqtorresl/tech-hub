import { Request, Response } from 'express';
import UserService from '../service/user';
import { User } from '../interfaces/user';

export default class UserController {

    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async getPersonalData(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user: User = await this.service.getPersonalData(id);

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }
    }

}