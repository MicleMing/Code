var tree = require('./lib/tree/tree');
var fs = require('fs');
var path = require('path');


//node formatter dirpath
//var dirPath = "E:/graduation/project/CodeDoctor/upload/localUpload/1429536497";
var unitPath = process.argv[2];
var dirPath = unitPath+path.sep+fs.readdirSync(unitPath)[0];
console.log(dirPath);

//文档结构树
var TreeArray = [];
tree.init(dirPath, TreeArray);
var json = tree.generateTree(unitPath,dirPath);
tree.generateJsonFile(unitPath,json);