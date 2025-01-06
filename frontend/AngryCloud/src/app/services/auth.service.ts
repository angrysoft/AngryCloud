import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { RestResponse } from '../models/rest-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  user = signal<User | null>(null);
  router = inject(Router);

  getUser() {
    this.http
      .get<RestResponse<User>>('/api/user/whoami', { withCredentials: true })
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
            return new Observable<RestResponse<User>>();
          }
          return throwError(
            () => new Error('Something bad happened; please try again later.')
          );
        })
      )
      .subscribe((resp) => {
        if (resp.ok) {
          this.user.set(resp.data);
          this.router.navigateByUrl('/root');
        }
      });
  }

  login(username: string, password: string) {
    const loginFormData = new FormData();
    loginFormData.set('username', username);
    loginFormData.set('password', password);
    return this.http.post<RestResponse<User>>(
      '/api/user/login',
      loginFormData,
      { withCredentials: true }
    );
  }

  logout() {
    this.user.set(null);
    return this.http.post('/api/user/logout', null, { withCredentials: true });
  }

  setUser(user: User) {
    this.user.set(user);
  }

  get isAuthenticated() {
    return this.user() !== null;
  }
}
