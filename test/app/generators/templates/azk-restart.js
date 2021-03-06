var createScript = require('../create-script')

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
    'echo "  restarting only..."',
    'echo " +++++++++++++++++++++++++++"',
    'azk restart -vv',
    ''

  ].join('\n'),
  __filename,
  opts)
}
