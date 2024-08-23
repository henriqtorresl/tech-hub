import { Router } from "express";
import AuthController from "../controller/auth";

const authRouter = Router();
const authController = new AuthController();

// No contexto do Express, bind é frequentemente usado 
// para garantir que métodos de classe que dependem de this 
// sejam chamados com o contexto correto quando são usadas como callbacks...
// Aqui, authController.login.bind(authController) cria uma nova função 
// onde this está fixado para a instância authController. Isso garante que 
// quando authController.login é chamado pelo Express, ele ainda tem 
// o contexto correto, e this.service estará acessível.

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/register', authController.register.bind(authController));

// Usar bind é uma forma de evitar problemas com a perda 
// de contexto de this, especialmente ao passar métodos de 
// instância como callbacks em frameworks como Express.

export default authRouter;