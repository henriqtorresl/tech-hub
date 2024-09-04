import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Conversation, CreateConversation, CreateConversationResponse } from '../interfaces/conversations';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private readonly api: string = `${environment.api}/conversation`;
  private conversation = new BehaviorSubject<Conversation>({id_conversa: 0, id_usuario_remetente: 0, id_usuario_destinatario: 0, nome_usuario_destinatario: ''});
  public currentConversation = this.conversation.asObservable();  // Vou me inscrever nesse observable para pegar o conteudo da conversa atual...

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  getOne(idConversation: number, idSenderUser: number): Observable<Conversation> {
    const params = new HttpParams()
    .set('idConversation', idConversation)
    .set('idUser', idSenderUser);

    return this.httpClient.get<Conversation>(this.api, { params }).pipe(take(1));
  }

  getConversations(idUser: string): Observable<Conversation[]> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.get<Conversation[]>(`${this.api}/user/${idUser}`, { headers }).pipe(
      take(1)
    );
  }

  insertIfNotExists(body: CreateConversation): Observable<CreateConversationResponse> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.post<CreateConversationResponse>(this.api, body , { headers }).pipe(
      take(1)
    );
  }

  // Esse método me permite passar um objeto de um componente para outro atraves de Observables
  shareConversation(conversation: Conversation) {
    this.conversation.next(conversation);
  }

}