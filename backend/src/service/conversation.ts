import ConversationRepository from "../repository/conversation";

export default class ConversationService {

    private repository: ConversationRepository;

    constructor() {
        this.repository = new ConversationRepository();
    }

}