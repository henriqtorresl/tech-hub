import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Observable, take } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly api: string = `${environment.api}/post`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  getAll(): Observable<Post[]> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.get<Post[]>(this.api, { headers }).pipe(
      take(1)
    );
  }

  getUserPosts(idUser: string): Observable<Post[]> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.get<Post[]>(`${this.api}/${idUser}`, { headers }).pipe(
      take(1)
    );
  }

}