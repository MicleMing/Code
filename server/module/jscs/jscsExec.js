var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var jscsExec = function (dirPath) {
	var child = exec('fecs ' + dirPath, function (error, stdout, stderr) {
		var stdoutArr = stdout.split('\n');
		var parternInfo = /INFO/;
		var parternWarn = /WARN/;
		var parternWarnCount = /\(\d\s*\w*\)/;
		var parternfileName = /\d{9,}.*\.js/;
		var stdoutClassify = [];
		var index = -1;

		stdoutArr.forEach(function (item) {
			if (parternInfo.test(item)) {
				index++;
				stdoutClassify.push({
					fileName: item.match(parternfileName)[0],
					warnCount: parseInt(item.match(parternWarnCount)[0].substring(1)), 
					warn: []
				})
			}
			else{
				if (stdoutClassify[index] && parternWarn.test(item)){
					stdoutClassify[index].warn.push({
						row: item.match(/line\s\d+/)[0].substring(5),
						col: item.match(/col\s\d+/)[0].substring(4),
						ression: item.split(':')[1]
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

module.exports = {
	jscsExec: jscsExec
}
