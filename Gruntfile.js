module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'bin/web-server.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    simplemocha: {
      backend: {
        src: [
          'test/server/*-test.js'
          ]
      }
    },
    karma: {
      unit: {
        configFile: './test/karma.conf.js',
        autoWatch: true
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');
  // Default task(s).
  grunt.registerTask('default', ['simplemocha']);
};
