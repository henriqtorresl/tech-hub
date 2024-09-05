import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, take } from 'rxjs';
import { Conversation } from 'src/app/interfaces/conversations';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  idUser!: string;
  conversations: Conversation[] = [];
  openConversation: boolean = false;

  constructor(
    private conversationService: ConversationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIdUser();
    this.getConversations();
    this.conversationIsOpen();
  }

  getIdUser(): void {
    this.idUser = localStorage.getItem('idUser')!;
  }

  getConversations(): void {
    this.conversationService.getConversations(this.idUser)
    .subscribe((response) => {
      this.conversations = response;
    });
  }

  conversationIsOpen(): void {
    combineLatest([
      this.conversationService.currentConversation,
      this.activatedRoute.queryParamMap
    ])
    .pipe(take(1))
    .subscribe(([conversation, activatedRoute]: any) => {
      const { params } = activatedRoute;

      if (params.openConversation && conversation.id_conversa != 0) {
        this.openConversation = params.openConversation;
      }
    });
  }

  sendMessage(conversation: Conversation): void {
    this.conversationService.shareConversation(conversation);   // Atribui o valor que vai ser emitido pelo observable currentConversation...
    this.openConversation = true;
  }

}
