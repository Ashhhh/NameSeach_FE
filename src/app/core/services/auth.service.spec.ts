import * as faker from 'faker';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { AuthService as APIAuthService } from '../../../app/api/services';
import { AuthTokenService } from './auth-token.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let authToken: AuthTokenService;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(AuthService);
    authToken = TestBed.get(AuthTokenService);
    auth = TestBed.get(APIAuthService);
  });

  beforeEach(() => {
    authToken.clearToken();
  });

  afterEach(() => {
    authToken.clearToken();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should return true', () => {
      const mockToken = faker.random.alphaNumeric(16);
      authToken.setToken(mockToken);

      expect(service.isAuthenticated()).toEqual(true);
    });

    it('should return false', () => {
      authToken.clearToken();

      expect(service.isAuthenticated()).toEqual(false);
    });
  });

  describe('login', () => {
    it('should log in and set the token', () => {
      const mockUsername = faker.internet.userName();
      const mockPassword = faker.internet.password();

      const mockToken = faker.random.alphaNumeric(16);
      const mockPayload = {
        jwt: mockToken
      };

      spyOn(authToken, 'setToken').and.callThrough();
      spyOn(auth, 'login').and.returnValue(of(mockPayload));

      service.login(mockUsername, mockPassword).subscribe(() => {
        expect(authToken.setToken).toHaveBeenCalledWith(mockToken);
        expect(service.isAuthenticated()).toEqual(true);
      });
    });
  });
});
