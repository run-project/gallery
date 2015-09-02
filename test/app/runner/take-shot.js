var BB = require('bluebird')
var webshot = require('webshot')

module.exports = function (url, destination, opt) {

  return new BB.Promise(function (resolve, reject) {

    var options = opt || {
      screenSize: {
        width: 900,
        height: 600
      },
      shotSize: {
        width: 900,
        height: 600 // 'all'
      },
      renderDelay: 3000 // wait for 10 seconds before take the shot
    }

    webshot(url, destination, options, function (err) {
      if (err) {
        reject(err)
      }
      resolve()
    })

  })
}
