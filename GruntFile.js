'use strict';

var pathToApp = 'app/';
var pathToLibs = pathToApp + 'libs/';
var livereloadSrc = 'src="http://localhost:35728/livereload.js"';

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      libs: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'angular/angular.min.js',
          'angular/angular.min.js.map',
          'angular-resource/angular-resource.min.js',
          'angular-resource/angular-resource.min.js.map',
          'jquery/dist/jquery.min.js',
          'jquery/dist/jquery.min.map',
          'bootstrap/dist/css/bootstrap.min.css',
          'bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: pathToLibs
      }
    },
    clean: [pathToLibs],
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    includereplace: {
      dev: {
        options: {
          globals: {
            livereload: livereloadSrc
          },
        },
        files: [{
          src: 'index.html',
          dest: pathToApp,
          expand: true,
          cwd: pathToApp + 'src/'
        }]
      },
      prod: {
        options: {
          globals: {
            livereload: ''
          },
        },
        files: [{
          src: 'index.html',
          dest: pathToApp,
          expand: true,
          cwd: pathToApp + 'src/'
        }]
      }
    },
    watch: {
      app: {
        options: {
          livereload: {
            port: 35728
          }
        },
        files: [
          pathToApp + '**/*'
        ]
      },
      express: {
        files: [
          'server.js',
          'config/**/*.{js,json}',
          'src/**/*.js'
        ],
        tasks: [
          'express:dev'
        ],
        options: {
          livereload: {
            port: 35728
          },
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'build:dev',
      'express',
      'watch'
    ]);
  });

  grunt.registerTask('build', function (target) {
    var buildTasks = [
      'clean',
      'copy'
    ];
    if (target === 'dev') {
      buildTasks.push('includereplace:dev');
      return grunt.task.run(buildTasks);
    }
    buildTasks.push('includereplace:prod');
    grunt.task.run(buildTasks);
  });

  grunt.registerTask('default', [
    'build'
  ]);
};
