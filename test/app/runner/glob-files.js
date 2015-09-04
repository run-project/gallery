var BB = require('bluebird')
var glob = require('glob')

module.exports = function (search_string, options) {

  return new BB.Promise(function (resolve, reject) {

    // options is optional
    glob(search_string, options, function (err, files) {
      if (err) {
        reject(err)
      }
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.
      resolve(files)
    })

  })
}
