"use strict";
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;


module.exports = function(grunt) {

    grunt.util.linefeed = '\r\n';
    
    //Load modules
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project configuration.
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            fileSave: {
                files: ['*.js', 'views/**/*.jade', 'public/*', 'routes/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },
        jshint: {            
            options: {
                force: true,
                globalstrict: true,
                // curly: true,
                // eqeqeq: true,
                eqnull: true,
                browser: true
            },
            scripts: {
                options: {
                    globals: {
                        jQuery: true,
                        angular: true,
                        _: true,
                        console: true,

                        require: true,
                        module: true,
                        __dirname: true
                    },
                },
                files: {
                    src: [
                        'public/*.js',
                        '*.js',
                        'routes/**/*.js'
                    ]
                }
            }
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('default', ['watch']);

};


