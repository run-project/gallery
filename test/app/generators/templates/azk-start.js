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
    'echo "  start from Github URL..."',
    'echo " +++++++++++++++++++++++++++"',
    'azk start -Rvv {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}} /tmp/buttons/{{=it.name}}',
    ''

  ].join('\n'),
  __filename,
  opts)
}
