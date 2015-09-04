var path = require('path')
var BB = require('bluebird')
var fsAsync = require('file-async')
var run = require('./run')
var cleanPersistents = require('./clean-persistents')
var generateAllScripts = require('./runner/generate-all-scripts')
var all_projects = require('../projects-list').projects

if (process.argv.length < 3) {
  process.exit(1)
}

var execution_path_list = process.argv.slice(2)

var runTests = function (execution_path_list, screenshots_folder, project) {
  return BB.Promise.each(execution_path_list, function (execution_path) {
    return run(project, {
      execution_path: execution_path,
      screenshots_folder: screenshots_folder
    })
    .catch(function (err) {
      console.log('run ERROR:', err)
    })
  })
}

// --------------------------------------------
// create a folder for screenshots
var screenshots_folder = path.join(__dirname, '../screenshots/', new Date().toISOString())
fsAsync.mkdirs(screenshots_folder)

// generate all script for each project
.then(function () {
  return BB.Promise.each(all_projects, function (project) {
    return generateAllScripts(project)
  })
})

// clean all before run
// generate all script for each project
.then(function () {
  if (execution_path_list.indexOf('azk-start') > -1) {
    return BB.Promise.each(all_projects, cleanPersistents)
  } else {
    return BB.resolve(true)
  }
})

// run scripts
.then(function () {
  return BB.Promise.each(all_projects, function (project) {
    return runTests(execution_path_list, screenshots_folder, project)
  })
})

.catch(function (err) {
  console.log('ERROR:', err)
})
