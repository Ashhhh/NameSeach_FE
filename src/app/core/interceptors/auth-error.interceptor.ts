import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

export const ERROR_MESSAGE_500 = 'An error has occurred on the server. Please try again later.';

/**
 * HTTP Interceptor for handling errors from the API and showing relevant UI
 */
@Injectable({ providedIn: 'root' })
export class AuthErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackbar: MatSnackBar
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    switch (err.status) {
                        case 500:
                            this.snackbar.open(ERROR_MESSAGE_500);
                            break;
                        default:
                            if (typeof err.error === 'object' && err.error.message) {
                                this.snackbar.open(err.error.message, 'DISMISS', { duration: 3000 });
                            }
                    }

                    return throwError(err);
                })
            );
    }
}
