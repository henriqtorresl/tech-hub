import PostRepository from '../repository/post';

export default class PostService {

    private repository: PostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    async getUserPosts(idUser: string) {
        return await this.repository.getUserPosts(idUser);
    }

    async getAll() {
        return await this.repository.getAll();
    }

}