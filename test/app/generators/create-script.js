var doT = require('dot')
var fsAsync = require('file-async')
var path = require('path')

module.exports = function (template_string, script_filename, opts) {

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

  var folder_name = path.basename(script_filename, '.js')
  var folder_full = path.join(
    __dirname,
    '../build/scripts/',
    folder_name)

  return fsAsync.mkdirs(folder_full).then(function () {

    var fullpath = path.join(folder_full,
      opts.repoOwner + '-' + opts.name + '-' + opts.branch + '.sh')

    // 1. Compile template function
    var tempFn = doT.template(template_string)

    var resultText = tempFn(opts)

    console.log(' - ' + fullpath)
    return fsAsync.writeFile(fullpath, resultText)

  })

}

