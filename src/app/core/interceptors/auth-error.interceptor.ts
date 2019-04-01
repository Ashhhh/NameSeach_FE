import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export class AuthErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackbar: MatSnackBar
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(
            catchError((err: HttpErrorResponse) => {
                switch (err.status) {
                    case 500:
                        this.snackbar.open('An error has occurred on the server. Please try again later.');
                        break;
                    default:
                        if (typeof err.error === 'object' && err.error.message) {
                            this.snackbar.open(err.error.message, 'DISMISS', {duration: 3000});
                        }
                }

                return throwError(err);
            })
        );
  }
}
