import { Request, Response } from 'express';
import PostService from '../service/post';
import { Post } from '../interfaces/post';

export default class PostController {

    private service: PostService;

    constructor() {
        this.service = new PostService();
    }

    async getUserPosts(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const posts: Post[] = await this.service.getUserPosts(id);

            if (posts.length == 0) {
                return res.status(404).json({ msg: 'Nenhuma publicação foi encontrada!' });
            }

            return res.status(200).json(posts);
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const posts: Post[] = await this.service.getAll();

            if (posts.length == 0) {
                return res.status(404).json({ msg: 'Nenhuma publicação foi encontrada!' });
            }

            return res.status(200).json(posts);
        } catch (error) {
            console.log('Erro: ', error);
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }
    }


}