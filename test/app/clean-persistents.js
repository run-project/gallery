var runner = require('./runner/runner')
var path = require('path')

module.exports = function (project, opts) {
  var full_project_name = project.repoOwner + '-' + project.name + '-' + project.branch
  // --------------------
  // clear
  console.log('\n\n - [' + project.name + '] Cleaning...')
  return runner.run({},
  '/bin/bash',
  path.join(__dirname, '/build/scripts/clear-project/' + full_project_name + '.sh'))

}

