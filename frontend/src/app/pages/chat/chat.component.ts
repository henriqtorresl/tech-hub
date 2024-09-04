import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.activatedRoute.queryParamMap.subscribe((response: any) => {
      const { params } = response;

      if (params.openConversation) {
        this.openConversation = params.openConversation;
      }
    });
  }

  // openConversation(): void {

  // }

}
