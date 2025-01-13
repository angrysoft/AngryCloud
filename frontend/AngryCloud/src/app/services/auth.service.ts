import { Injectable, signal } from '@angular/core';
import { RestResponse } from '../models/rest-response';
import { User } from '../models/user';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService<User> {
  user = signal<User | null>(null);

  getUser() {
    this._get<RestResponse<User>>('/api/user/whoami', {
      withCredentials: true,
    }).subscribe((resp) => {
      console.log("auth", resp)
      if (resp.ok) {
        this.user.set(resp.data);
        this.router.navigateByUrl('/folder');
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

  get username() {
    return this.user()?.username ?? '';
  }

  changePassword(
    payload: Partial<{ password: string | null; password2: string | null }>
  ) {
    return this._put(`/api/user/change-password`, payload);
  }
}
