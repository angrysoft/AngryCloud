import { Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RestResponse } from '../models/rest-response';
import { User } from '../models/user';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService<User> {
  user = signal<User | null>(null);

  getUser() {
    this._get<RestResponse<User>>('/api/user/whoami', { withCredentials: true })
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
    return this._post<FormData>('/api/user/login', loginFormData);
  }

  logout() {
    this.user.set(null);
    return this._post('/api/user/logout', null);
  }

  setUser(user: User) {
    this.user.set(user);
  }

  get isAuthenticated() {
    return this.user() !== null;
  }

  changePassword(
    payload: Partial<{ password: string | null; password2: string | null }>
  ) {
    return this._put(`/api/user/change-password`, payload);
  }
}
