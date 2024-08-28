export interface Post {
    id_publicacao: number;
    id_usuario: number;
    nome_usuario?: string;
    titulo: string;
    conteudo: string;
    qnt_comentarios: number;
    qnt_curtidas: number;
}