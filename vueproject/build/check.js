/**
 * 用于检测项目是否存在
 * created by linqize
 * @returns {boolean}
 */

let path = require('path')
let fs = require('fs')

let project
let argv;

//获取npm 输入命令的字符串
try {
  argv = JSON.parse(process.env.npm_config_argv).original
  project = argv[2].slice(2)
}	catch(ex) {
  if (process.env.NODE_ENV === 'development') {
    project = 'demo'
  } else {
    argv = process.argv
    project = argv[2].slice(2)
  }
}
// 去掉命令参数头'--',  --demo => demo

function check() {
  //接收所打包的参数
  if (project == undefined || project == null) {
    console.log('argv project missed!')
    return false
  }

//判断文件夹是否存在
  var subPath = path.resolve(__dirname, '../sites/' + project)
  try {
    fs.accessSync(subPath, fs.F_OK);
  } catch (e) {
    console.log('no project found!')
    return false
  }
  console.log('project checked success!')
  return true
}


module.exports = {
  check: check,
  project: project
}
