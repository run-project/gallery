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

var runTests = function (execution_path_list, project) {
  return function () {
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
}

// --------------------------------------------
// create a folder for screenshots
var screenshots_folder = path.join(__dirname, '../screenshots/', new Date().toISOString())
fsAsync.mkdirs(screenshots_folder)
.then(function () {
  return BB.Promise.each(all_projects, function (project) {
    return generateAllScripts(project)
    .then(function () {

      // clean all before run
      if (execution_path_list.indexOf('azk-start') > -1) {
        console.log('\n\n\n')
        console.log(' - "azk-start" detected')
        console.log(' - will clean all persistent folders...')
        console.log('\n\n\n')
        return cleanPersistents(project)
               .then(runTests(execution_path_list, project))
      } else {
        return runTests(execution_path_list, project)()
      }

    })
  })
})
.catch(function (err) {
  console.log('ERROR:', err)
})
