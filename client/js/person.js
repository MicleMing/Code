$(function () {
	var personUrl = '../../web/person.php';
	$.ajax({
		url: personUrl,
		type:'GET',
		dataType: 'json',
		success: function (data) {

			var str = '';
			data = data || [];
			data.forEach(function (item, index) {
				str += '<tr>';
				str += '<th scope="row">' + (index + 1) + '</th>';
				str += '<td>' + item.uri.slice(0, -4) + '</td>';
				str += '<td>' + new Date(parseInt(item.time)*1000).toLocaleString() + '</td>';
				str += '<td>' + item.uri + '</td>';
				str += '<td>' + item.uri + '</td>';
				str += '<td><span><a href="./detail.php?item='+item.time+'">查看详情</a></span>';
				str += '<span><a href="../../web/person.php?download='+item.time+'/'+item.uri+'" target="_blank">导出项目</a></span>';
				str += '<span><a href="./detail.php?item='+item.time+'">格式化修复</a></span>';
				str += '<span class="remove" data-item='+item.time+'>删除</span>';
				//str += '<span class="download" data-filePath=' + item.path+'/'+item.uri + '>导出项目</span>';
				str += '</td>';
				str += '</tr>'
			});
			$('.tbody').html(str);
					

		},
		error: function (error) {
			console.log(error);
		}
	});

	$('.tbody').on('click', function(e) {
		if (e.target.className === 'remove') {
			var data = {
				'deleteItem': e.target.dataset.item
			};

			$.ajax({
				url: personUrl,
				type: 'POST',
				data: data,
				success: function (data) {
					location.reload();
				},
				error: function (error) {
					alert('删除失败');
				}
			});
		}
/*		if (e.target.className === 'download') {
			var data = {
				'downloadItem': e.target.dataset.filepath
			}
			$.ajax({
				url: personUrl,
				type: 'POST',
				data: data,
				success: function (data) {
					console.log(data);
				},
				error: function (error) {
					alert('下载失败');
				}
			});
		}*/


	})

})