var runner = require('./runner/runner')
var takeShot = require('./runner/take-shot')
var path = require('path')
var os = require('os');
var osName = require('os-name');

module.exports = function (project, opts) {

  console.log(' :: opts:', opts)

  var ini = new Date()

  // -----------------
  // generate scripts
  console.log('\n\n - [' + project.name + '] Generating Shell Script files...')
  return require('./generators/templates/clear-project')(project)
  .then(function () {
    return require('./generators/templates/azk-start')(project)
  })
  .then(function () {
    return require('./generators/templates/azk-restart')(project)
  })
  .then(function () {
    return require('./generators/templates/azk-restart-reprovision')(project)
  })
  .then(function () {
    return require('./generators/templates/azk-stop')(project)
  })

  // -----------------
  // download azkfile
  .then(function () {
    console.log('\n\n - [' + project.name + '] Downloading azkfile...')
    return runner.run({},
    'curl',
    '-o',
    path.join(__dirname, '..', './azkfiles/' + project.repoOwner + '-' + project.name + '-' + project.branch + '-Azkfile.js'),
    'https://raw.githubusercontent.com/' + project.repoOwner + '/' + project.name + '/' + project.branch + '/Azkfile.js')
  })

  // --------------------
  // clear
  .then(function () {
    if (opts.execution_path === 'first-time') {
      console.log('\n\n - [' + project.name + '] Cleaning...')
      return runner.run({},
      '/bin/bash',
      path.join(__dirname, '/build/scripts/clear/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
    } else {
      return true
    }
  })

  // ------------------
  // run azk start URL
  .then(function () {
    if (opts.execution_path === 'first-time') {
      console.log('\n\n - [' + project.name + '] Starting from URL...')
      return runner.run({},
      '/bin/bash',
      path.join(__dirname, '/build/scripts/start/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
    } else if (opts.execution_path === 'restart-reprovision') {
      console.log('\n\n - [' + project.name + '] Restarting...')
      return runner.run({},
      '/bin/bash',
      path.join(__dirname, '/build/scripts/restart-reprovision/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
    }
  })

  // ----------------
  // save to keen.io
  .then(function () {
    var elapsed = (new Date()) - ini
    elapsed = elapsed / 1000
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

  // --------------------------------------------
  // take a screen shot from web-site tree times
  .then(function () {
    var url = project.name + '.dev.azk.io'
    var destination = path.join(__dirname, '../screenshots/' + project.repoOwner + '-' + project.name + '-' + project.branch + '-1.png')
    console.log('\n\n - [' + project.name + '] 1 Saving screenshot from `' + url + '` to `' + destination + '`')
    return takeShot(
      url,
      destination,
      null
    )
  })
  .then(function () {
    var url = project.name + '.dev.azk.io'
    var destination = path.join(__dirname, '../screenshots/' + project.repoOwner + '-' + project.name + '-' + project.branch + '-2.png')
    console.log('\n\n - [' + project.name + '] 2 Saving screenshot from `' + url + '` to `' + destination + '`')
    return takeShot(
      url,
      destination,
      null
    )
  })
  .then(function () {
    var url = project.name + '.dev.azk.io'
    var destination = path.join(__dirname, '../screenshots/' + project.repoOwner + '-' + project.name + '-' + project.branch + '-3.png')
    console.log('\n\n - [' + project.name + '] 3 Saving screenshot from `' + url + '` to `' + destination + '`')
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
    path.join(__dirname, '/build/scripts/stop/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
  })

}

