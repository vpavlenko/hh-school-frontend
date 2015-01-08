module.exports = function(grunt) {
    'use strict';

    var lessSources = [
        'less/main.less',
        'less/pane.less'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: [
                    '**/*.less'
                ],
                tasks: ['less']
            },
            js: {
                files: [
                    'js/*.js'
                ],
                tasks: ['jshint', 'concat']
            },
            all: {
                options: {
                    livereload: true
                },
                files: [
                    'index.html', 'dist/*'
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'js/*.js']
        },
        less: {
            development: {
                files: {
                    'dist/bundle.css': lessSources
                }
            },
            production: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: {
                    'dist/bundle.min.css': lessSources
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/moment/min/moment-with-locales.min.js',
                    'js/*.js'
                ],
                dest: 'dist/bundle.js'
            }
        },
        connect: {
            server: {
                options: {
                    open: true
                }
            }
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register the default tasks.
    grunt.registerTask('build', ['jshint', 'less', 'concat']);
    grunt.registerTask('default', ['build', 'connect:server', 'watch']);
};
