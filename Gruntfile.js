module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                src: 'lib/forebone.js',
                dest: 'dist/forebone.min.js'
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'lib/**/*.js'],
            options: {
                force: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    Forebone: true
                }
            }
        },

        qunit: {
            files: ['test/**/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // default - all tasks
    grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);

    // test - jshint, testing
    grunt.registerTask('test', ['jshint', 'qunit']);

    // build - only dist
    grunt.registerTask('build', ['uglify']);
};