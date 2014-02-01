'use strict';

var pkgJson = require('./package.json');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Creates a human.txt
    // Run this task with the 'grunt humans_txt' command.
    // https://github.com/roughcoder/grunt-humans-txt
    humans_txt: {
      external_file: {
        options: {
          content: grunt.file.readJSON('humans.json')
        },
        dest: 'public/humans.txt'
      }
    },

    // Compile our LESS sources
    // https://github.com/gruntjs/grunt-contrib-less
    less: {
      // Run this task with the 'grunt less:dev' command.
      dev: {
        options: {
          paths: [ 'client/css' ],
          concat: true
        },
        files: {
          'public/css/app.css': 'client/css/**/*.less'
        }
      },
      // Run this task with the 'grunt less:prod' command.
      prod: {
        options: {
          paths: [ 'client/css' ],
          concat: true,
          cleancss: true
        },
        files: {
          'public/css/app.css': 'client/css/**/*.less'
        }
      }
    },

    // Concat our JavaScript client sources
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      // Run this task with the 'grunt concat:client' command.
      client : {
        options : {
          separator : '\n'
        },
        src : [ 'client/js/app.js', 'client/js/**/*.js'],
        dest : 'public/js/app.js'
      }
    },

    // Minimise our JavaScript client sources
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) */\n',
        mangle: false
      },
      // Run this task with the 'grunt uglify:client' command.
      client: {
        files: {
          'public/js/app.min.js' : [ '<%= concat.client.dest %>' ]
        }
      }
    },

    // Clean
    // https://github.com/gruntjs/grunt-contrib-clean
    clean : {
      // Run this task with the 'grunt clean:build' command.
      build : {
        src : [
          'target',
          'public/js/version.js',
          'public/humans.txt',
          'public/js/app.js',
          'public/js/app.min.js',
          'public/css/app.css'
        ]
      },
      // Run this task with the 'grunt clean:node' command.
      node: {
        src : [
          'node_modules'
        ]
      }
    },

    // Creates a ZIP package ready for deployment
    // https://github.com/gruntjs/grunt-contrib-compress
    compress: {
      // Run this task with the 'grunt compress:client' command.
      client: {
        options: {
          archive: function () {
            return 'target/myApp-client-' + pkgJson.version + '.zip';
          }
        },
        files: [
          {expand: true, src: ['public/**']}
        ]
      },
      // Run this task with the 'grunt compress:all' command.
      all: {
        options: {
          archive: function () {
            return 'target/myApp-' + pkgJson.version + '.zip';
          }
        },
        files: [
          // TODO: it does zip the node modules folder
          {expand: true, src: ['!node_modules', '*']}
        ]
      }
    },

    // Checkstyle for JavaScript
    // https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      // Run this task with the 'grunt jshint:all' command.
      all: {
        src: ['Gruntfile.js', 'server.js', 'server/**/*.js', 'client/js/**/*.js', 'test/**/*.js'],
        options: {
          jshintrc: true
        }
      }
    },

    // Watch the following files and execute the given tasks if they change
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        livereload: true
      },
      clientJs: {
        files: ['client/js/**/*.js', 'client/js/**/*.template'],
        tasks: ['concat:client', 'uglify:client']
      },
      clientCss: {
        files: ['client/css/**/*.less'],
        tasks: ['less:dev']
      }
    },

    // Runs our tests
    // https://github.com/pghalliday/grunt-mocha-test
    mochaTest: {
      spec: {
        // Run this task with the 'grunt mochaTest:spec' command.
        src: ['test/mocha/unit/**/*Spec.js'],
        options: {
          reporter: 'spec',
          require: ['test/mocha/mocha.conf.js']
        }
      },
      // Run this task with the 'grunt mochaTest:xunit' command.
      // Outputs xunit results for the integration into Jenkins
      xunit: {
        src: ['test/mocha/unit/**/*Spec.js'],
        options: {
          require: ['server.js', 'test/mocha/mocha.conf.js'],
          reporter: 'xunit',
          captureFile: './target/mocha/test-reports.xml',
          quiet: true
        }
      },
      // Run this task with the 'grunt mochaTest:coverage' command.
      // Outputs cobertura results for the integration into Jenkins
      coverage: {
        src: ['test/mocha/unit/**/*Spec.js'],
        options: {
          require: ['server.js', 'test/mocha/mocha.conf.js'],
          reporter: 'mocha-cobertura-reporter',
          captureFile: './target/mocha/coverage.xml',
          quiet: true
        }
      },
      coverageHtml: {
        src: ['test/mocha/unit/**/*Spec.js'],
        options: {
          reporter: 'html-cov',
          require: ['server.js', 'test/mocha/mocha.conf.js'],
          captureFile: './target/mocha/cov.html',
          quiet: true
        }
      }
    },

    // Runs our karma tests
    // https://github.com/karma-runner/grunt-karma
    karma: {
      unit: {
        configFile: 'test/karma/karma.conf.js',
        singleRun: true
      }
    },

    // Runs our e2e tests with protractor
    mochaProtractor: {
      options: {
        browsers: ['Chrome'],
        reporter: 'Spec',
        baseUrl: 'http://localhost:8000',
        slow: 3000
      },
      files: ['test/e2e/unit/**/*Spec.js']
    },

    // Grunt task to automate environment configuration for future tasks
    // https://github.com/jsoverson/grunt-env
    env: {
      test: {
        NODE_ENV: 'test'
      }
    }

  });

  // Load NPM tasks
  grunt.loadNpmTasks('grunt-humans-txt');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-protractor');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-env');

  grunt.file.mkdir('target/mocha');
  grunt.file.mkdir('target/karma');

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // Default task(s).
  grunt.registerTask('default', ['clean:build', 'humans_txt', 'less:dev', 'concat', 'uglify']);

  // Makes a release.
  grunt.registerTask('release', [
    'clean:build',
    'humans_txt',
    'less:prod',
    'concat',
    'uglify',
    'mochaTest:spec',
    'karma:unit',
    'compress']);

  // Test task for use in the command line.
  grunt.registerTask('test', ['env:test', 'mochaTest:spec' /*'karma:unit'*/]);

  // Test task for use in Jenkins.
  grunt.registerTask('jenkins', ['env:test', 'mochaTest:xunit', 'mochaTest:coverage', 'mochaTest:coverageHtml', 'karma:unit']);

  // Test task for use in Travis.
  grunt.registerTask('travis', ['env:test', 'default', 'test']);

};
