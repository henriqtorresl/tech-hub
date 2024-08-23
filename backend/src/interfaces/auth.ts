export interface RegisterBody {
    name: string;
    password: string;
    cpf: string;
    email: string;
    phone: string;
}

export interface LoginBody {
    cpf: string;
    password: string;
}