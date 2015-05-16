var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var jscsExec = function (dirPath) {
	var child = exec('fecs ' + dirPath, function (error, stdout, stderr) {
		var stdoutArr = stdout.split('\n');
		var parternInfo = /INFO.(?!Congratulations)/;
		var parternWarn = /WARN/;
		var parternWarnCount = /\(\d*\s*\w*\)/;
		var parternfileName = /\d{9,}.*\.(js|css|html)/;
		var stdoutClassify = [];
		var index = -1;

		stdoutArr.forEach(function (item) {
			if (parternInfo.test(item)) {
				index++;
				stdoutClassify.push({
					fileName: item.match(parternfileName)[0],
					warnCount: item.match(parternWarnCount)[0].substring(1), 
					warn: []
				})
			}
			else{
				if (stdoutClassify[index] && parternWarn.test(item)){
					stdoutClassify[index].warn.push({
						row: item.match(/line\s\d+/)[0].substring(5),
						col: item.match(/col\s\d+/)?item.match(/col\s\d+/)[0].substring(4):null,
						ression: item.split(':').slice(1).join(';')
					});
				}
			}
		});

		fs.writeFile(path.join(path.dirname(dirPath) + '/fecs.json'), JSON.stringify(stdoutClassify), function (err) {
			if (err) {
				console.log(err);
			}
		})

	});
}
//jscsExec("E:/graduation/project/CodeDoctor/upload/localUpload/1431764144");
module.exports = {
	jscsExec: jscsExec
}
