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
  'echo "---------------------------------------"',
  'echo "Downloading {{=it.repoOwner}}/{{=it.name}}#{{=it.branch}}..."',
  'echo "---------------------------------------"',
  'mkdir -p azkfiles',
  'curl -o azkfiles/{{=it.repoOwner}}-{{=it.name}}-{{=it.branch}}-Azkfile.js https://raw.githubusercontent.com/{{=it.repoOwner}}/{{=it.name}}/{{=it.branch}}//Azkfile.js',
  ''
].join('\n'))

var resultText = tempFn({
  repoOwner: process.argv[2],
  name: process.argv[3],
  branch: process.argv[4]
})

console.log(resultText)
