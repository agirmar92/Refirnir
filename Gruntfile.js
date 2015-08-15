module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['background.jpg'],
                    dest: 'images/'
                }]
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    angular: true,
                    jQuery: true
                }
            },
            files: {
                src: ['js/Controllers/*.js', 'js/Factories/*.js', 'js/*.js']
            }

        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['jshint']);

};