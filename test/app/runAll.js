var BB = require('bluebird')
var run = require('./run')
var all_projects = require('../projects-list').projects

if (process.argv.length < 3) {
  console.log('\n%% options: first-time OR restart-reprovision \n')
  process.exit(1)
}

BB.Promise.each(all_projects, function (project) {
  return run(project, {
    execution_path: process.argv[2]
  })
})

