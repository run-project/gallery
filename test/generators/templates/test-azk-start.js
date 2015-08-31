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
  'echo ""',
  'echo ""',
  'echo ""',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  'echo " {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}"',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  'echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"',
  '',
  'echo ""',
  'echo "cd /tmp/buttons/{{=it.name}} folder"',
  'cd /tmp/buttons/{{=it.name}}',
  '',

  'echo ""',
  'echo ""',
  'echo " +++++++++++++++++++++++++++"',
  'echo "  $ azk stop"',
  'echo " +++++++++++++++++++++++++++"',
  'azk stop',
  '',

  'echo ""',
  'echo ""',
  'echo " +++++++++++++++++++++++++++"',
  'echo "  removing any persistent/sync folders..."',
  'echo " +++++++++++++++++++++++++++"',
  'azk info |',
  '  grep -e "\(sync_folders\|persistent_folders\)" |',
  '  awk -F ":" "{ print $2 }" |',
  '  sed "s/.*\(persistent_folders\|sync_folders\)\/\(\w\+\).*/\\2/g" |',
  '  tail -n 1 |',
  '  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR',
  '',

  'echo ""',
  'echo ""',
  'echo " +++++++++++++++++++++++++++"',
  'echo "  removing old project folder if exists..."',
  'echo " +++++++++++++++++++++++++++"',
  'cd /tmp/buttons',
  'sudo rm -rf /tmp/buttons/{{=it.name}}',

  '',
  'echo ""',
  'echo ""',
  'echo " +++++++++++++++++++++++++++"',
  'echo "  restarting with reprovision..."',
  'echo " +++++++++++++++++++++++++++"',
  'azk start -Rovv {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}} /tmp/buttons/{{=it.name}}'

].join('\n'))

var resultText = tempFn({
  repoOwner: process.argv[2],
  name: process.argv[3],
  branch: process.argv[4]
})

console.log(resultText)
