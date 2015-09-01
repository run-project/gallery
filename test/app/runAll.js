var BB = require('bluebird')
var run = require('./run')
var all_projects = require('../projects-list').projects

BB.Promise.each(all_projects, function (project) {
  return run(project)
})

