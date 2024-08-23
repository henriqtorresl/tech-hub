import { Request, Response } from "express";
import AuthService from "../service/auth";

export default class AuthController {

    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    register(req: Request, res: Response): void {
        const { password } = req.body;

        // adicionar os tratamentos de erro
        this.service.register(password);

        res.send('sucesso')
    }

    login(req: Request, res: Response): void {
        const {} = req.body;
    }

}