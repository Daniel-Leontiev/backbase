import { browser } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class AppPage {
  navigateTo(): wdpromise.Promise<any> {
    return browser.get('/');
  }
}
