var child_process = require('child_process')
var BB = require('bluebird')
require('colors')

var SpawnHelper = {
  __esModule: true,

  printOutput: function (prefix, data) {
    // print 'prefix' before command
    var ui_prefix = prefix ? prefix.grey : ''
    var prefixed_output = data.toString().replace(/^(.*)/gm, ui_prefix + ' $1'.grey)

    console.log(prefixed_output)
  },

  spawnAsync: function (opts) {
    return new BB.Promise(function (resolve, reject) {
      var spawn_cmd = child_process.spawn(opts.executable, opts.params_array, opts.options)
      var outputs = []

      // print command
      var full_command = ('$> ' + opts.executable + ' ' + opts.params_array.join(' ')).bold
      SpawnHelper.printOutput(
        opts.spawn_prefix,
        full_command
      )

      spawn_cmd.stdout.on('data', function (data) {
        outputs.push(data)

        // print output
        SpawnHelper.printOutput(
          opts.spawn_prefix,
          data)
      })

      spawn_cmd.stderr.on('data', function (data) {
        outputs.push(data)

        // print output
        SpawnHelper.printOutput(
          opts.spawn_prefix,
          data)
      })

      spawn_cmd.on('close', function (code) {
        var result_object = {
          error_code: code,
          message: outputs.join('\n')
        }

        if (code !== 0) {
          reject(result_object)
        } else {
          resolve(result_object)
        }
      })
    })
  }
}

module.exports = SpawnHelper
