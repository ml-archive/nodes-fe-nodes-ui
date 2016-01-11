// https://github.com/gruntjs/grunt-contrib-concat
module.exports = {
  dist: {
    files: {
      '<%= paths.dist %>assets/js/docs.js': '<%= paths.doc %>assets/js/*.js',
      '<%= paths.dist %>assets/js/nodes.js': '<%= paths.js %>*.js'
    }
  }
};