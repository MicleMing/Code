var tree = require('./lib/tree/tree');


//node formatter dirpath
//var dirPath = "E:/graduation/project/CodeDoctor/upload/localUpload/1429536497";
var dirPath = process.argv[2];

//文档结构树
var TreeArray = [];
tree.init(dirPath, TreeArray);
var json = tree.generateTree(dirPath);
tree.generateJsonFile(dirPath,json);