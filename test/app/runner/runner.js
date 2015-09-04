var spawnAsync = require('./spawn-helper').spawnAsync
var BB = require('bluebird')
var Keen = require('keen-js')

module.exports = {

  run: function () {
    var args = Array.prototype.slice.call(arguments)

    var options = args[0]
    var main_exec = args[1]
    var rest = args.slice(2)

    return spawnAsync({
      executable: main_exec,
      params_array: rest,
      options: options
    })
  },

  sendToKeen: function (event_name, obj_to_send) {
    var keen_client = new Keen({
      projectId: '55e4d19790e4bd4f09be5024', // String (required always)
      writeKey: 'c8f7ad86fd7331489ce8a166d3b4e4241b43f51c20c69c03495327430f23dba7b1ea7cf1c96243de9eec8331822993c9dd6eeef1e7f962d7a6e3359a2d93e81dbe1910b586cb87b4ef24b6c11db0493024316dcf96c8bd159ffecce34eaa046d79b2873d37a43ca9f8243f79bde0d5d3'
    })

    return new BB.Promise(function (resolve, reject) {
      keen_client.addEvent(event_name, obj_to_send, function (err, res) {
        if (err) {
          return reject(err)
        } else {
          return resolve(res)
        }
      })
    })
  }

}
