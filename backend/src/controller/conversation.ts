import ConversationService from "../service/conversation";

export default class ConversationController {

    private service: ConversationService;

    constructor() {
        this.service = new ConversationService();
    }

}