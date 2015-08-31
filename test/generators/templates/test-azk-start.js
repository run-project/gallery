var doT = require('dot')

// http://olado.github.io/doT/index.html
doT.templateSettings = {
  evaluate: /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'it',
  strip: false,
  append: true,
  selfcontained: false
}

// 1. Compile template function
var tempFn = doT.template([
  '',
  'echo ""',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  'echo " Starting {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}"',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  '',
  'echo ""',
  'echo $(date)',
  'echo ""',
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
  'echo ""',
  'echo $(date)',
  'echo ""',
  ''

].join('\n'))

var resultText = tempFn({
  repoOwner: process.argv[2],
  name: process.argv[3],
  branch: process.argv[4]
})

console.log(resultText)
