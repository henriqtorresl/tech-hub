import crypto from 'crypto';
import { LoginBody, RegisterBody } from '../interfaces/auth';
import UserRepository from '../repository/user';

const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    segredo: crypto.createHash('sha256').update('sua-chave-super-secreta').digest('base64').substr(0, 32) // Gera 32 caracteres a partir de um hash
};

export default class AuthService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(body: RegisterBody) {
        try {
            // Criptografando a senha...
            body.password = this.encrypt(body.password);

            await this.userRepository.createUser(body);
        } catch(error) {
            console.log('Erro: ', error);
        }
    }

    async login(body: LoginBody): Promise<void> {
        // Lógica para login

        try {
            // Descriptografando a senha...
            body.password = this.encrypt(body.password);

            // await this.usuarioRepository.createUser(body);
        } catch(error) {
            console.log('Erro: ', error);
        }
    }

    // Criptografando a senha
    encrypt(password: string): string {
        const iv = crypto.randomBytes(16); // Cria um novo IV para cada operação
        const cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, iv);
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`; // Retorna o IV junto com o texto criptografado
    }

    // Descriptografando a senha
    decrypt(encryptedData: string): string {
        const [ivHex, encryptedText] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex'); // Converte o IV do formato hexadecimal
        const decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
