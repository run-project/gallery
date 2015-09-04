var runner = require('./runner/runner')
var takeShot = require('./runner/take-shot')
var path = require('path')
var os = require('os')
var osName = require('os-name')
var fsAsync = require('file-async')

var numeral = require('numeral')
var padLeft = require('lodash.padleft')
var formatNumber = function (number) {
  return padLeft(numeral(number).format('0,0.00'), 6, '0')
}

module.exports = function (project, opts) {

  var ini = new Date()
  var full_project_name = project.repoOwner + '-' + project.name + '-' + project.branch
  var elapsed = null
  var screenshots_folder = opts.screenshots_folder

  // -----------------
  // download azkfile
  console.log('\n\n - [' + project.name + '] Downloading azkfile...')
  return runner.run({},
    'curl',
    '-o',
    path.join(__dirname, '..', './azkfiles/' + full_project_name + '-Azkfile.js'),
    'https://raw.githubusercontent.com/' + project.repoOwner + '/' + project.name + '/' + project.branch + '/Azkfile.js'
  )

  // --------------------
  // clear
  .then(function () {
    if (opts.execution_path === 'first-start') {
      console.log('\n\n - [' + project.name + '] Cleaning...')
      return runner.run({},
      '/bin/bash',
      path.join(__dirname, '/build/scripts/clear-project/' + full_project_name + '.sh'))
    } else {
      return true
    }
  })

  // ------------------
  // run azk start URL
  .then(function () {
    if (opts.execution_path === 'first-start') {
    /**
     * first-start
     */
      console.log('\n\n - [' + project.name + '] Starting from URL...')
      return runner.run({},
      '/bin/bash',
      path.join(__dirname, '/build/scripts/azk-start/' + full_project_name + '.sh'))
    } else if (opts.execution_path === 'restart-reprovision') {
    /**
     * restart-reprovision
     */
      console.log('\n\n - [' + project.name + '] Restarting and Reprovision...')
      return fsAsync.exists('/tmp/buttons/' + project.name)
      .then(function (exist) {
        if (exist) {
          return runner.run({},
          '/bin/bash',
          path.join(__dirname, '/build/scripts/azk-restart-reprovision/' + full_project_name + '.sh'))
        } else {
          throw new Error('/tmp/buttons/' + project.name + ' does not exist')
        }
      })
    } else if (opts.execution_path === 'restart') {
    /**
     * restart
     */
      console.log('\n\n - [' + project.name + '] Restarting...')
      return fsAsync.exists('/tmp/buttons/' + project.name)
      .then(function (exist) {
        if (exist) {
          return runner.run({},
          '/bin/bash',
          path.join(__dirname, '/build/scripts/azk-restart/' + full_project_name + '.sh'))
        } else {
          throw new Error('/tmp/buttons/' + project.name + ' does not exist')
        }
      })
    }
  })

  // --------------------------------------------
  // take a screen shot from web-site tree times
  .then(function () {

    // calculate elapsed time
    elapsed = (new Date()) - ini
    elapsed = elapsed / 1000

    // calculate elapsed time
    var url = project.name + '.dev.azk.io'

    var destination = path.join(screenshots_folder,
      full_project_name + '_' + formatNumber(elapsed) + '_' + opts.execution_path + '.png')

    console.log('\n\n - [' + project.name + '] Saving screenshot from http://' + url + ' to `' + destination + '`')
    return takeShot(
      url,
      destination,
      null
    )
  })

  // --------------------
  // stop
  .then(function () {
    console.log('\n\n - [' + project.name + '] Stopping...')
    return runner.run({},
    '/bin/bash',
    path.join(__dirname, '/build/scripts/azk-stop/' + full_project_name + '.sh'))
  })

  // ----------------
  // save to keen.io
  .then(function () {
    console.log('\n\n - [' + project.name + '] elapsed: ' + elapsed + ' seconds. Sending to Keen.io...')
    return runner.sendToKeen('azk-button-test', {
      execution_path: opts.execution_path,
      elapsed: elapsed,
      repoOwner: project.repoOwner,
      name: project.name,
      branch: project.branch,
      device_info: {
        os: osName(),
        proc_arch: os.arch(),
        total_memory: Math.floor(os.totalmem() / 1024 / 1024),
        cpu_info: os.cpus()[0].model,
        cpu_count: os.cpus().length
      },
      keen: {
        timestamp: new Date().toISOString()
      }
    })
  })

}

