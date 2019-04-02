import * as faker from 'faker';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthErrorInterceptor, ERROR_MESSAGE_500 } from './auth-error.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe(`AuthHttpInterceptor`, () => {
  let service: AuthErrorInterceptor;
  let httpMock: HttpTestingController;
  let snackbar: MatSnackBar;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        MatSnackBar,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthErrorInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(AuthErrorInterceptor);
    snackbar = TestBed.get(MatSnackBar);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  describe('AuthErrorInterceptor', () => {
    it('should log a snackbar for error 500s', () => {
      spyOn(snackbar, 'open');
      http.get('/test').subscribe(() => {}, (err) => {});

      const httpRequest = httpMock.expectOne(`/test`);
      httpRequest.flush({}, { status: 500, statusText: 'error' });

      expect(snackbar.open).toHaveBeenCalledWith(ERROR_MESSAGE_500);
    });

    it('should log a snackbar for errors with messages', () => {
      const mockMessage = faker.lorem.words();

      spyOn(snackbar, 'open');
      http.get('/test').subscribe(() => {}, (err) => {});

      const httpRequest = httpMock.expectOne(`/test`);
      httpRequest.flush({ message: mockMessage }, { status: 422, statusText: 'error' });

      expect(snackbar.open).toHaveBeenCalledWith(mockMessage, 'DISMISS', { duration: 3000 });
    });

    it('should do nothing', () => {
      spyOn(snackbar, 'open');
      http.get('/test').subscribe(() => {}, (err) => {});

      const httpRequest = httpMock.expectOne(`/test`);
      httpRequest.flush({}, { status: 400, statusText: 'error' });

      expect(snackbar.open).not.toHaveBeenCalled();
    });
  });
});
