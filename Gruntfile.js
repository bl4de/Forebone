module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                src: 'lib/forebone.js',
                dest: 'dist/forebone.min.js'
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
}