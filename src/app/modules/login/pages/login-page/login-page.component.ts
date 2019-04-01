import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private router: Router
  ) { }

  public username = '';
  public password = '';
  public pending = false;

  validate() {
    if (!this.username || !this.password) {
      this.snackbar.open('You need to enter a username or password');
      return false;
    }

    return true;
  }

  login() {
    if (!this.validate()) {
      return;
    }

    return this.auth.login(this.username, this.password)
      .pipe(tap(() => this.pending = true))
      .subscribe(
        () => {
          this.router.navigate(['']);
        },
        (err) => {
          if (err.status === 401) {
            this.snackbar.open('Your username or password was incorrect', 'DISMISS', {duration: 3000});
          }
        },
        () => {
          this.pending = false;
        }
      );
  }

  register() {
    if (!this.validate()) {
      return;
    }

    return this.auth.register(this.username, this.password)
      .pipe(tap(() => this.pending = true))
      .subscribe(
        () => {
          this.router.navigate(['']);
        },
        () => {},
        () => {
          this.pending = false;
        }
      );
  }

}
