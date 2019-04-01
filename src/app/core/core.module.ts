import {NgModule, Optional, SkipSelf} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Router} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiModule } from '../api/api.module';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthErrorInterceptor } from './interceptors/auth-error.interceptor';
import { JWT_LOCALSTORAGE_KEY } from './services/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RouterModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
        },
        whitelistedDomains: ['localhost:3000']
      }
    }),
    ApiModule.forRoot({
      rootUrl: environment.apiUrl
    })
  ],
  exports: [
    BrowserModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [Router]},
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true, deps: [MatSnackBar]}
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
