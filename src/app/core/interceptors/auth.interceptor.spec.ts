import * as faker from 'faker';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe(`AuthHttpInterceptor`, () => {
    let service: AuthInterceptor;
    let httpMock: HttpTestingController;
    let auth: AuthService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
            providers: [
                MatSnackBar,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
            ],
        });

        service = TestBed.get(AuthInterceptor);
        auth = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
        http = TestBed.get(HttpClient);
    });

    describe('AuthErrorInterceptor', () => {
        it('should log out on 401s', () => {
            spyOn(auth, 'logout');
            http.get('/test').subscribe(() => {}, (err) => {});

            const httpRequest = httpMock.expectOne(`/test`);
            httpRequest.flush({}, { status: 401, statusText: 'error' });

            expect(auth.logout).toHaveBeenCalled();
        });

        it('should do nothing on other errors', () => {
            spyOn(auth, 'logout');
            http.get('/test').subscribe(() => {}, (err) => {});

            const httpRequest = httpMock.expectOne(`/test`);
            httpRequest.flush({}, { status: 500, statusText: 'error' });

            expect(auth.logout).not.toHaveBeenCalled();
        });
    });
});
