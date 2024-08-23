import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginBody, LoginResponse, RegisterBody, RegisterResponse } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = `${environment.api}/auth`;

  constructor(
    private httpClient: HttpClient
  ) { }

  register(body: RegisterBody): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${this.api}/register`, body).pipe(
      take(1)
    );
  }

  login(body: LoginBody): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.api}/login`, body).pipe(
      take(1)
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario');

    return (token == null && idUsuario == null) ? false : true;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
  }

}
