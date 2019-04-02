import { Injectable } from '@angular/core';

export const JWT_LOCALSTORAGE_KEY = 'jwt';

/**
 * A service for managing the auth token currently stored in the users LocalStorage
 */
@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  /**
   * Set the current JWT Token
   * @param token JWT Token
   */
  setToken(token: string): void {
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, token);
  }

  /**
   * Gets the current JWT Token
   */
  getToken(): string {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  }

  /**
   * Clears the JWT Token from LocalStorage
   */
  clearToken(): void {
    localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
  }

}
