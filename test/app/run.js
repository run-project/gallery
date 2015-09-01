var runner = require('./runner/runner')
var takeShot = require('./runner/take-shot')
var path = require('path')

var shClear = require('./generators/templates/clear-azk-start')
var shTestStart = require('./generators/templates/test-azk-start')

module.exports = function (project) {

  var ini = new Date()

  /**/console.log('\n>>---------\n __dirname:\n', __dirname, '\n>>---------\n');/*-debug-*/

  // --------------------
  // generate scripts
  return shClear(project)
  .then(function () {
    console.log('\n\n - [' + project.name + '] Generating Shell Script files...')
    return shTestStart(project)
  })

  // download azkfile
  .then(function () {
    console.log('\n\n - [' + project.name + '] Downloading azkfile...')
    return runner.run({},
    'curl',
    '-o',
    path.join(__dirname, '..', './azkfiles/' + project.repoOwner + '-' + project.name + '-' + project.branch + '-Azkfile.js'),
    'https://raw.githubusercontent.com/' + project.repoOwner + '/' + project.name + '/' + project.branch + '/Azkfile.js')
  })

  .then(function () {
    return shTestStart(project)
  })

  // --------------------
  // stop/clear
  .then(function() {
    console.log('\n\n - [' + project.name + '] Cleaning...')
    return runner.run({},
    '/bin/bash',
    path.join(__dirname, '/build/scripts/clear/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
  })

  // --------------------
  // run azk start URL
  .then(function () {
    console.log('\n\n - [' + project.name + '] Running...')
    return runner.run({},
    '/bin/bash',
    path.join(__dirname, '/build/scripts/start/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
  })

  // --------------------
  // save to keen.io
  .then(function () {
    var elapsed = (new Date()) - ini
    elapsed = elapsed / 1000
    console.log('\n\n - [' + project.name + '] elapsed: ' + elapsed + ' seconds. Sending to Keen.io...')
    return runner.sendToKeen('azk-button-test', {
      elapsed: elapsed,
      repoOwner: project.repoOwner,
      name: project.name,
      branch: project.branch,
      keen: {
        timestamp: new Date().toISOString()
      }
    })
  })

  // --------------------
  // take a screen shot from web-site
  .then(function () {
    var url = project.name + '.dev.azk.io'
    var destination = path.join(__dirname, '../screenshots/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.png')
    console.log('\n\n - [' + project.name + '] Saving screenshot from `' + url + '` to `' + destination + '`')
    return takeShot(
      url,
      destination,
      null
    )
  })

  // --------------------
  // stop/clear again
  .then(function () {
    console.log('\n\n - [' + project.name + '] Cleaning again...')
    return runner.run({},
    '/bin/bash',
    path.join(__dirname, '/build/scripts/clear/' + project.repoOwner + '-' + project.name + '-' + project.branch + '.sh'))
  })

}

