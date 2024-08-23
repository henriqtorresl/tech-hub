import { Usuario } from "./usuario";

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

export interface RegisterResponse {
    msg: string;
}

export interface LoginResponse {
    msg: string;
    token: string;
    usuario: Usuario;
}