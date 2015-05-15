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
				str += '<td>' + item.uri + '</td>';
				str += '<td>' + new Date(parseInt(item.time)*1000).toLocaleString() + '</td>';
				str += '<td>' + item.uri + '</td>';
				str += '<td>' + item.uri + '</td>';
				str += '<td><span class="remove" data-item='+item.time+'>删除</span><span><a href="./detail.php?item='+item.time+'">查看详情</a></span></td>';
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
	})

})