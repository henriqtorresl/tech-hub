import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Conversation } from 'src/app/interfaces/conversations';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  conversation!: Conversation;

  constructor(
    private conversationService: ConversationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentConversation();
  }

  getCurrentConversation(): void {
    this.conversationService.currentConversation
    .pipe(takeUntil(this.destroy$))   // O Take until vai ser usado para se desinscrever do observable
    .subscribe((response) => {
      this.conversation = response;
    });
  }

  navigateToUserPage(): void {
    this.router.navigate(['profile', this.conversation.id_usuario_destinatario]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
