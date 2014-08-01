'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ---------------------------------------------------------------------- //
    watch: {
      code: {
        files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js', 'app/**/*.ejs', 'app/**/*.css'],
        tasks: ['jshint:all'],
      },
      options: {
        livereload: true,
      }
    },
    // ---------------------------------------------------------------------- //
    jshint: {
      options: {jshintrc: '.jshintrc', reporter: require('jshint-stylish')},
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
    }
    // ---------------------------------------------------------------------- //
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jshint:all']);
  grunt.registerTask('default', ['build', 'watch']);

};

