module.exports = function(grunt) {
    'use strict';

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
                    'js/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint', 'concat']
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
                options: {
                    paths: ['css']
                },
                files: {
                    'dist/bundle.css': 'less/main.less'
                }
            },
            production: {
                options: {
                    paths: ['css'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: {
                    'dist/bundle.min.css': 'less/main.less'
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
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Register the default tasks.
    grunt.registerTask('build', ['jshint', 'less', 'concat']);
    grunt.registerTask('default', ['build', 'watch']);
};
