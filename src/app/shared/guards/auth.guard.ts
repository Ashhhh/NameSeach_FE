import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../../app/core/services/auth.service';
import { RoutePaths } from '../../../app/app-routing.module';

/**
 * A guard for rerouting the user from areas they aren't meant to have access to
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private auth: AuthService,
      private router: Router
  ) {}

  canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate([RoutePaths.LOGIN]);
        return false;
    }

      return true;
  }
}
