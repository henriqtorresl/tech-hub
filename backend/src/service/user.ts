import UserRepository from '../repository/user';

export default class UserService {

    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async getPersonalData(idUsuario: string) {
        return await this.repository.getPersonalData(idUsuario);
    }

}