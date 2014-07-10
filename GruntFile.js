'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        watch: {
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'express:dev',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'serve'
    ]);
};
