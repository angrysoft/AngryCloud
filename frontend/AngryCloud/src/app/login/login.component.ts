import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { LoginForm } from '../models/user';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  loginForm: FormGroup<LoginForm>;
  constructor() {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    if (this.auth.isAuthenticated) this.router.navigateByUrl('/root');
  }

  login() {
    const values = this.loginForm.value;
    this.auth
      .login(values.username ?? '', values.password ?? '')
      .pipe(
        catchError((arg) => {
          return of(arg);
        })
      )
      .subscribe((resp) => {
        if (resp.ok) {
          this.auth.setUser(resp.data);
          this.router.navigateByUrl('/root');
        } else {
          console.log('login error');
          this.loginForm.setErrors({ loginError: true });
        }
      });
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
