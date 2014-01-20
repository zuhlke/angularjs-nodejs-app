var expect = require('chai').use(require('chai-as-promised')).expect;

describe('Login Page', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should display the title of the application', function() {
    expect(browser.getTitle()).to.eventually.equal('MyApp');
  });

  it('should display the current version of the application', function() {
    var version = element(by.id('appversion'));
    expect(version.getText()).to.eventually.equal('0.0.1-SNAPSHOT');
  });

});
