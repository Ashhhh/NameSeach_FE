import { catchError } from 'rxjs/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/app-routing.module';

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
        .pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigate([RoutePaths.LOGIN]);
                }

                return throwError(err);
            })
        );
  }
}
