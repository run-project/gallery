var createScript = require('../create-script')

module.exports = function (opts) {
  return createScript([
    '',
    'echo ""',
    'echo " - Stoping {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}..."',
    '',
    'echo "   $ cd /tmp/buttons/{{=it.name}} folder"',
    'cd /tmp/buttons/{{=it.name}}',
    '',
    'echo " - stoping systems..."',
    'echo "   $ azk stop"',
    'azk stop',
    ''
  ].join('\n'),
  __filename,
  opts)
}
