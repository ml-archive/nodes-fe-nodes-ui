// https://github.com/gruntjs/grunt-contrib-sass
module.exports = {
  dist: {
    options: {
      sourceMap: true,
      includePaths: ['bower_components']
    },
    files: {
      '<%= paths.dist %>assets/css/nodes.css': '<%= files.scss %>',
      '<%= paths.dist %>assets/css/docs.css': '<%= paths.doc %>assets/scss/docs.scss'
    }
  }
};