var createScript = require('../create-script')
var path = require('path')

module.exports = function (opts) {
  return createScript([
    '',
    'echo ""',
    'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
    'echo " Starting {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}"',
    'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
    '',
    'echo "cd /tmp/buttons/{{=it.name}} folder"',
    'cd /tmp/buttons/{{=it.name}}',
    '',
    'echo ""',
    'echo ""',
    'echo " +++++++++++++++++++++++++++"',
    'echo "  restarting with reprovision..."',
    'echo " +++++++++++++++++++++++++++"',
    'azk restart -Rvv',
    ''

  ].join('\n'),

  path.join(__dirname, '../../build/scripts/restart-reprovision/',
    opts.repoOwner + '-' + opts.name + '-' + opts.branch + '.sh'),

  opts)
}
