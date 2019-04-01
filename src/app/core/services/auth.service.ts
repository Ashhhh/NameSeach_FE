import { Injectable } from '@angular/core';
import { AuthService as APIAuthService } from 'src/app/api/services';
import { map } from 'rxjs/operators';
import { AuthTokenService } from './auth-token.service';
import { Observable } from 'rxjs';
import { Jwt } from 'src/app/api/models';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/app-routing.module';

export const JWT_LOCALSTORAGE_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: APIAuthService,
    private authToken: AuthTokenService,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    return !!this.authToken.getToken();
  }

  login(username: string, password: string): Observable<Jwt> {
    return this.auth.login({username, password})
      .pipe(map(payload => {
        this.authToken.setToken(payload.jwt);

        return payload;
      }));
  }

  register(username: string, password: string): Observable<Jwt> {
    return this.auth.register({username, password})
      .pipe(map(payload => {
        this.authToken.setToken(payload.jwt);

        return payload;
      }));
  }

  logout() {
    this.authToken.clearToken();
    this.router.navigate([RoutePaths.LOGIN]);
  }
}
