var createScript = require('./create-script')
var path = require('path')

module.exports = function (opts) {
  return createScript([
    '',
    'echo ""',
    'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
    'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
    'echo " Starting {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}"',
    'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
    'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
    '',
    'echo "----------------"',
    'echo THE START: $(date)',
    'echo "----------------"',
    '',
    'echo "cd /tmp/buttons/{{=it.name}} folder"',
    'cd /tmp/buttons/{{=it.name}}',
    '',
    'echo ""',
    'echo ""',
    'echo " +++++++++++++++++++++++++++"',
    'echo "  restarting with reprovision..."',
    'echo " +++++++++++++++++++++++++++"',
    'azk start -Rvv {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}} /tmp/buttons/{{=it.name}}',
    '',
    'echo "----------------"',
    'echo THE END: $(date)',
    'echo "----------------"',
    ''

  ].join('\n'),

  path.join(__dirname, '../../build/scripts/start/',
    opts.repoOwner + '-' + opts.name + '-' + opts.branch + '.sh'),

  opts)
}
