(function($, doc) {
		$.init();
		$.ready(function() {
			//普通示例
			var userPicker = new $.PopPicker();
			userPicker.setData([{
				value: 'ywj',
				text: '安阳市'
			}, {
				value: 'aaa',
				text: '周口市'
			}, {
				value: 'lj',
				text: '新乡市'
			}, {
				value: 'ymt',
				text: '固始市'
			}]);
			
			var showUserPickerButton = doc.getElementById('showUserPicker');
			var userResult = doc.getElementById('showUserPicker');
			showUserPickerButton.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					var aa = JSON.stringify(items[0].text);
					var city = aa.replace(/\"/g,"")
					userResult.innerText = city;
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
			});
})(mui, document);