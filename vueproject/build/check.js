/**
 * 用于检测项目是否存在
 * created by alex
 * @returns {boolean}
 */

let project = process.argv[6]
let path = require('path')
let fs = require('fs')

if (process.env.NODE_ENV === 'development') {
  project = process.argv[6]
} else {
  project = process.argv[2]
}

function check() {
  //接收所打包的参数
  if (project == undefined) {
    console.log('argv project missed!')
    return false
  }

//判断文件夹是否存在
  var subPath = path.resolve(__dirname, '../sites/' + project)
  console.log('../sites/' + project)
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
