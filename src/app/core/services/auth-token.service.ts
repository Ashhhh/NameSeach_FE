import { Injectable } from '@angular/core';
import { AuthService as APIAuthService } from 'src/app/api/services';

export const JWT_LOCALSTORAGE_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  setToken(token: string) {
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, token);
  }

  getToken() {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  }

  clearToken() {
    localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
  }

}
