import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, take } from 'rxjs';
import { User } from '../interfaces/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly api: string = `${environment.api}/user`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  getPersonalData(idUser: string): Observable<User> {
    const headers: HttpHeaders = this.tokenService.getHeaders();

    return this.httpClient.get<User>(`${this.api}/personal-data/${idUser}`, 
      { headers }
    ).pipe(take(1));
  }

}
