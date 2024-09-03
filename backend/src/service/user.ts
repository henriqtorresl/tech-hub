import UserRepository from '../repository/user';

export default class UserService {

    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async getPersonalData(idUser: string) {
        return await this.repository.getPersonalData(idUser);
    }

    async getName(idUser: number) {
        return await this.repository.getName(idUser);
    }

}