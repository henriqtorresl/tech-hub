import crypto, { Cipher, Decipher } from 'crypto';

const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    segredo: crypto.createHash('sha256').update('sua-chave-super-secreta').digest('base64').substr(0, 32), // Gera 32 caracteres a partir de um hash
    iv: crypto.randomBytes(16)
};

export default class AuthService {

    private cipher: Cipher;
    private decipher: Decipher;

    constructor() {
        this.cipher = crypto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, DADOS_CRIPTOGRAFAR.iv);
        this.decipher = crypto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo, DADOS_CRIPTOGRAFAR.iv);
    }

    register(password: string): void {
        // Lógica para registro
        console.log(password);
        const teste = this.encrypt(password);
        console.log(teste);
        console.log(this.decrypt(teste));
    }

    login(): void {
        // Lógica para login
    }

    // Criptografando a senha
    private encrypt(password: string): string {
        let encrypted = this.cipher.update(password, 'utf8', 'hex');
        encrypted += this.cipher.final('hex');
        return encrypted;
    }

    // Descriptografando a senha
    private decrypt(encryptedPassword: string): string {
        let decrypted = this.decipher.update(encryptedPassword, 'hex', 'utf8');
        decrypted += this.decipher.final('utf8');
        return decrypted;
    }

}
