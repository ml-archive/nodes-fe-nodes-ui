// https://github.com/gruntjs/grunt-contrib-concat
module.exports = {
  dist: {
    files: {
      '<%= paths.dist %>assets/js/docs.js': '<%= paths.doc %>assets/js/*.js',
      '<%= paths.dist %>assets/js/nodes.js': [
        '<%= paths.js %>/modules/**/*.js',
        '<%= paths.js %>/nodes.js',
        '<%= paths.js %>/scripts.js',
      ],
      '<%= paths.js %>nodes.compiled.js': [
        '<%= paths.js %>/modules/**/*.js',
        '<%= paths.js %>/nodes.js',
        '<%= paths.js %>/scripts.js',
      ]
    }
  }
};