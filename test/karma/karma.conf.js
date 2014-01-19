// Karma configuration
// Generated on Sat Jan 18 2014 13:07:15 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../../',


    // frameworks to use
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      // libraries
      'public/vendor/jquery/jquery.min.js',
      'public/vendor/underscore/underscore-min.js',
      'public/vendor/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
      'public/vendor/html5-boilerplate/js/plugins.js',
      'public/vendor/html5-boilerplate/js/main.js',
      'public/vendor/bootstrap/dist/js/bootstrap.min.js',
      'public/vendor/alertify/alertify.min.js',
      'public/vendor/angular/angular.min.js',
      'public/vendor/angular-cookies/angular-cookies.min.js',
      'public/vendor/angular-route/angular-route.min.js',
      'public/vendor/restangular/dist/restangular.min.js',
      'public/vendor/angulartics/dist/angulartics.min.js',
      'public/vendor/angulartics/dist/angulartics-google-analytics.min.js',
      'public/vendor/angular-promise-tracker/promise-tracker.min.js',
      'public/vendor/greensock/src/minified/TweenLite.min.js',

      // mocks
      'public/vendor/angular-mocks/angular-mocks.js',

      // application
      'public/js/app.js',
      'client/js/controllers/*.js',
      'client/js/filters/*.js',
      'client/js/services/*.js',
      'client/js/directives/*.js',
      'public/js/version.js',

      // templates
      'public/views/*.html',

      // tests
      'test/karma/unit/**/*Spec.js'
    ],


    preprocessors : {
      'public/js/**/*.js' : 'coverage',
      'public/views/*.html' : [ 'ng-html2js' ]
    },


    ngHtml2JsPreprocessor: {
      // strip this from the file path
      // stripPrefix: 'public/',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'templates'
    },


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'junit', 'coverage'],


    coverageReporter : {
      type : 'text-summary',
      dir : 'target/karma/coverage/'
    },


    junitReporter : {
      outputFile : 'target/karma/TEST-javascript.xml'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
