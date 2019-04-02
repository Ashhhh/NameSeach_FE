import { Injectable } from '@angular/core';
import { AuthService as APIAuthService } from '../../../app/api/services';
import { map } from 'rxjs/operators';
import { AuthTokenService } from './auth-token.service';
import { Observable } from 'rxjs';
import { Jwt } from '../../../app/api/models';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../app/app-routing.module';

export const JWT_LOCALSTORAGE_KEY = 'jwt';

/**
 * A Service for managing authentication with the API
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: APIAuthService,
    private authToken: AuthTokenService,
    private router: Router
  ) { }

  /**
   * Check if the user is currently authenticated
   */
  isAuthenticated(): boolean {
    return !!this.authToken.getToken();
  }

  /**
   * Attempt to log in to the API and store the JWT token so that we are now authenticated
   * @param username Username
   * @param password Password
   */
  login(username: string, password: string): Observable<Jwt> {
    return this.auth.login({username, password})
      .pipe(map(payload => {
        this.authToken.setToken(payload.jwt);

        return payload;
      }));
  }

  /**
   * Attempt to register a new account with the API and log in
   * @param username Username
   * @param password Password
   */
  register(username: string, password: string): Observable<Jwt> {
    return this.auth.register({username, password})
      .pipe(map(payload => {
        this.authToken.setToken(payload.jwt);

        return payload;
      }));
  }

  /**
   * Log out and navigate back to the login screen
   */
  logout() {
    this.authToken.clearToken();
    this.router.navigate([RoutePaths.LOGIN]);
  }
}
