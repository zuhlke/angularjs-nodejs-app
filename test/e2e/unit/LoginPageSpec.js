var expect = require('chai').use(require('chai-as-promised')).expect;

describe('The login page', function() {

  beforeEach(function() {
    browser.get('/');
    browser.waitForAngular();
  });

  it('should display the title of the application', function() {
    expect(browser.getTitle()).to.eventually.equal('My App (Development) (v 0.0.1-SNAPSHOT)');
  });

  it('should display the current version of the application', function() {
    var version = element(by.id('appversion'));
    expect(version.getText()).to.eventually.equal('0.0.1-SNAPSHOT');
  });

  it('should allow an existing user to login', function() {
    element(by.model('login.username')).sendKeys('ToastShaman');
    element(by.model('login.password')).sendKeys('password');
    element(by.id('loginButton')).click().then(function(newUrl) {
      browser.waitForAngular();
      expect(browser.getCurrentUrl()).to.eventually.match(/dashboard$/);
    });
  });

  it('should show an error message when the user provided a wrong username or password', function() {
    element(by.model('login.username')).sendKeys('ToastShaman');
    element(by.model('login.password')).sendKeys('foobar');
    element(by.id('loginButton')).click().then(function(newUrl) {
      browser.waitForAngular();
      expect(element(by.binding('formErrors.extra')).getText()).to.eventually.equal('Invalid username or password');
    });
  })
});
