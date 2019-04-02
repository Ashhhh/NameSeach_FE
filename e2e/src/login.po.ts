import { browser, by, element } from 'protractor';
import { RoutePaths } from '../../src/app/app-routing.module';

export class LoginPage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}/${RoutePaths.LOGIN}`) as Promise<any>;
  }

  getUsernameInput() {
    return element(by.css('login-page--username'));
  }

  getPasswordInput() {
    return element(by.css('login-page--password'));
  }

  getLoginButton() {
    return element(by.css('login-page--login'));
  }
}
