import * as faker from 'faker';
import { TestBed } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(AuthTokenService);
  });

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set, get and clear tokens', () => {
    const randomToken = faker.lorem.word();

    expect(service.getToken()).toBeNull();

    service.setToken(randomToken);

    expect(service.getToken()).toEqual(randomToken);

    service.clearToken();

    expect(service.getToken()).toBeNull();
  });
});
