import * as faker from 'faker';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent, NO_LOGIN_MESSAGE } from './login-page.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../../../../app/core/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let snackbar: MatSnackBar;
  let auth: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();

    snackbar = TestBed.get(MatSnackBar);
    auth = TestBed.get(AuthService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should attempt to log in', () => {
    const mockUsername = faker.internet.userName();
    const mockPassword = faker.internet.password();
    const compiled = fixture.debugElement.nativeElement;

    const username$ = compiled.querySelector('.login-page--username');
    const password$ = compiled.querySelector('.login-page--password');
    const login$ = compiled.querySelector('.login-page--login');

    username$.value = mockUsername;
    password$.value = mockPassword;

    spyOn(component, 'login');

    login$.click();

    expect(component.login).toHaveBeenCalled();
  });

  describe('validate', () => {
    it('should open a snackbar', () => {
      component.username = undefined;
      component.password = undefined;

      spyOn(snackbar, 'open');

      expect(component.validate()).toEqual(false);
      expect(snackbar.open).toHaveBeenCalledWith(NO_LOGIN_MESSAGE);
    });
  });

  describe('login', () => {
    it('should attempt to log in', () => {
      const mockUsername = faker.internet.userName();
      const mockPassword = faker.internet.password();

      spyOn(auth, 'login').and.returnValue(of([]));
      spyOn(router, 'navigate');

      component.username = mockUsername;
      component.password = mockPassword;

      component.login();

      expect(auth.login).toHaveBeenCalledWith(mockUsername, mockPassword);
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
