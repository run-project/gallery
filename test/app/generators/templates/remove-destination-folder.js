var createScript = require('../create-script')
var path = require('path')

module.exports = function (opts) {
  return createScript([
    '',
    'echo " - removing old project folder if exists..."',
    'cd /tmp/buttons',
    'sudo rm -rf /tmp/buttons/{{=it.name}}',
    ''
  ].join('\n'),
  __filename,
  opts)
}
