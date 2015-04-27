var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var jshintExec = function (dirPath) {
	var child = exec('jshint '+dirPath, function (error, stdout, stderr) {
		var stdoutArr = stdout.split('\n');
		var ret;
		var temp;
		var fileName = '';
		var row = 0;
		var col = 0;
		var ression = '';
		stdoutArr.map(function (item, index) {
			ret = item.split(/.js:/ig);
			if (ret[1]) {	
				temp = ret[1].split(',');
				fileName = ret[0];
				row = temp[0].replace(/[^0-9]/ig,'');
				col = temp[1].replace(/[^0-9]/ig,'');
				ression = temp[2];
				stdoutArr[index] = {
					fileName: fileName,
					row: row,
					col: col,
					ression: ression
				}				
			}
		})

		if (error) {
			stdoutArr.push(error)
		}
		fs.writeFile(path.join(dirPath + '/jshint.json'), JSON.stringify(stdoutArr), function (err) {
			if (err) {
				console.log(err);
			}
		})
	})
}

//jshintExec("E:/graduation/project/CodeDoctor/upload/localUpload/1430056504");

module.exports = {
	jshintExec: jshintExec
}
