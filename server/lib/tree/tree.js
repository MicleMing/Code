var fs = require('fs');
var path = require('path');

//var dirPath = path.resolve('node_modules');

//初始化tree数组，最初的时候肯定是一个文件夹

var init = function (dirPath, TreeArray) {
		TreeArray.push({
		"title"   : path.relative(path.dirname(dirPath), dirPath),
		"key"     : path.relative(path.dirname(dirPath), dirPath),
		"folder"  : true,
		"deep"    : 0,
		"children": []
	})
}

var generateTree = function (root,dir) {

	var stat = fs.lstatSync(dir);
	var isDir = stat.isDirectory();
	if (!isDir) {
		return {
			'title': path.relative(path.dirname(dir),dir),
			'key'  : path.relative(root,dir)
		};
	}
	else {
		var list = fs.readdirSync(dir);
		return {
			'title'   : path.relative(path.dirname(dir),dir),
			'key'     : path.relative(path.dirname(dir),dir),
			'folder'  : true,
			'children': list.map(function (item) {
				return generateTree(root,dir+'/'+item);
			})
		};
	}
}

var generateJsonFile = function (dir, json) {
	var arr = '['+JSON.stringify(json)+']';
	fs.writeFile(path.join(dir+'/tree.json'), arr, function (err) {
		if (err) {
			throw err;
		}
	}) 
}


module.exports = {
	init: init,
	generateTree: generateTree,
	generateJsonFile: generateJsonFile
};


