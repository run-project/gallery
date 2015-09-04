var BB = require('bluebird')
var globAsync = require('./glob-files')
var path = require('path')

module.exports = function (project) {
  var folder = path.join(__dirname, '..', './generators/templates/')
  return globAsync(folder + '*.js')
  .then(function (files) {
    return BB.Promise.each(files, function (template_path) {
      return require(template_path)(project)
    })
  })
}
