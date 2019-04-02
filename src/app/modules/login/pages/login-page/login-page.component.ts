import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../app/core/services/auth.service';

export const NO_LOGIN_MESSAGE = 'You need to enter a username or password';

/**
 * Page for logging in or registering with the API
 */
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

  /**
   * Validate the current username and password inputs. Shows a message if validation fails.
   */
  validate(): boolean {
    if (!this.username || !this.password) {
      this.snackbar.open(NO_LOGIN_MESSAGE);
      return false;
    }

    return true;
  }

  /**
   * Attempt to log in to the API and redirect to the home screen (Currently the Search)
   */
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

  /**
   * Attempt to register with the API and redirect to the home screen (Currently the Search)
   */
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
