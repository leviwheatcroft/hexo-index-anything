module.exports = function(grunt) {

  grunt.initConfig({
    docker: {
      options: {
        exclude: [
          'node_modules',
          'notes',
          'docs',
          '.git'
        ]
      },
      docs: {
        src: [
          '*.js',
          '*.md'
        ],
        dest: 'docs'
      }
    },
    mocha: {
      test: {
        src: 'test.js'
      }
    }

  })

  grunt.loadNpmTasks('grunt-docker');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['docker']);
  grunt.registerTask('test', ['mocha'])


};
