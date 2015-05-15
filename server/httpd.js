var tree = require('./lib/tree/tree');
var jshint = require('./module/jshint/jshintExec');
var jscs = require('./module/jscs/jscsExec');
var fs = require('fs');
var path = require('path');


//node formatter dirpath
//var dirPath = "E:/graduation/project/CodeDoctor/upload/localUpload/1430833758";
var unitPath = process.argv[2];
var dirPath = unitPath+'/'+fs.readdirSync(unitPath)[0];

//文档结构树
var TreeArray = [];
tree.init(dirPath, TreeArray);
var json = tree.generateTree(unitPath,dirPath);
tree.generateJsonFile(unitPath,json);

//执行jshint

jshint.jshintExec(dirPath);
jscs.jscsExec(dirPath);