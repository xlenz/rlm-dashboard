'use strict';

var pathToApp = 'app/';
var pathToLibs = pathToApp + 'libs/';

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      libs: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'angular/angular.min.js',
          'angular/angular.min.js.map',
          'jquery/jquery.min.js',
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
    watch: {
      app: {
        options: {
          livereload: true
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
          livereload: true,
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'build',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'copy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
