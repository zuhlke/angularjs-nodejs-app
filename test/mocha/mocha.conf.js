
// Loads the assertion libraries for all the tests
require("mocha-as-promised")();
var should = require('chai').use(require('chai-as-promised')).should();

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: 'server'
});
