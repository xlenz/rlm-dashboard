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
                    'bootstrap/dist/fonts/*.*',
                    '**/*.min.{css,js,js.map,map}',
                    '!**/src/**'
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
            html: {
                options: {
                    livereload: true
                },
                files: [
                            pathToApp + '**/*.*'
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
        'serve'
    ]);
};
