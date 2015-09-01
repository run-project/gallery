var createScript = require('./create-script')
var path = require('path')

module.exports = function (opts) {
  return createScript([
    'echo "---------------------------------------"',
    'echo "Downloading {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}..."',
    'echo "---------------------------------------"',
    'mkdir -p azkfiles',
    'curl -o azkfiles/{{=it.repoOwner}}-{{=it.name}}-{{=it.branch}}-Azkfile.js https://raw.githubusercontent.com/{{=it.repoOwner}}/{{=it.name}}/{{=it.branch}}//Azkfile.js',
    ''
  ].join('\n'),

  path.join('../../build/scripts/clear/', opts.repoOwner, opts.name, opts.branch),

  opts)
}

