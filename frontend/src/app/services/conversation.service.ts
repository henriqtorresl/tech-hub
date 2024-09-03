import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Conversation, CreateConversation, CreateConversationResponse } from '../interfaces/conversations';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private readonly api: string = `${environment.api}/conversation`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  getConversations(idUser: number): Observable<Conversation> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.get<Conversation>(`${this.api}/user/${idUser}`, { headers }).pipe(
      take(1)
    );
  }

  insertIfNotExists(body: CreateConversation): Observable<CreateConversationResponse> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.post<CreateConversationResponse>(this.api, body , { headers }).pipe(
      take(1)
    );
  }

}