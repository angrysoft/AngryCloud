import { FormControl } from '@angular/forms';

interface User {
  password?: string | null;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

interface Authority {
  authority: string;
}

interface Login {
  username: string | null;
  password: string | null;
}

interface LoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

export type { User, Authority, Login, LoginForm };
