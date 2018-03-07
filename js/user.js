////模态框
//$(".login_content .list_r_img").click(function() {
//	$(".login_content .head_box,.login_content .model").show()
//})
//$(".login_content .head_box p").click(function() {
//	$(".login_content .head_box,.login_content .model").hide()
//})

//分享
$(".fx_url").click(function() {
	$(".url_box,.model").show()
})
$(".url_box .close,.model").click(function() {
	$(".url_box,.model").hide()
})

//支付问题
//$(".que_type").click(function(){
//	$(".qus_box,.model").show()
//})
//$(".qus_box .close").click(function(){
//	$(".qus_box,.model").hide()
//})

//我的资产转入
$(".zc .btn_p button").eq(0).click(function() {
	$(".zc1 .enter_box,.zc_body .model").show()
})
$(".zc1 .close").click(function() {
	$(".zc1 .enter_box,.zc_body .model").hide()
})

//我的分销
$(".fenx .p0 i").click(function() {
	if($(this).parent().next('table').css('display') == 'none') {
		$(this).parent().next('table').show()
		$(this).addClass('mui-icon-arrowup')
		$(this).removeClass('mui-icon-arrowdown')
	} else {
		$(this).removeClass('mui-icon-arrowup')
		$(this).addClass('mui-icon-arrowdown')
		$(this).parent().next('table').hide()
	}
});


// textarea输入字数限制
$('#question_text').on('input', function() {

	var _this = $(this);

	if(_this.val().length > 256) {

		alert('字数太多');

		_this.val(_this.val().substr(0, 256))

		return;

	}

});

//  上传图片   需要plus支持

//上传图片  	
(function() {
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;

	var UpImg = {

		imageList: document.getElementById('up_img'),

	};

	UpImg.files = [];
	UpImg.uploader = null;
	UpImg.deviceInfo = null;
	mui.plusReady(function() {
		//设备信息，无需修改
		UpImg.deviceInfo = {
			appid: plus.runtime.appid,
			imei: plus.device.imei, //设备标识
			images: UpImg.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os: mui.os.version,
			net: '' + plus.networkinfo.getCurrentType()
		}
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	UpImg.clearForm = function() {
		UpImg.question.value = '';
		UpImg.contact.value = '';
		UpImg.imageList.innerHTML = '';
		UpImg.newPlaceholder();
		UpImg.files = [];
		index = 0;
		size = 0;
		imageIndexIdNum = 0;

	};

	if(!UpImg.imageList) {

		return
	}

	UpImg.getFileInputArray = function() {
		return [].slice.call(UpImg.imageList.querySelectorAll('.file'));
	};
	UpImg.addFile = function(path) {
		UpImg.files.push({
			name: "images" + index,
			path: path,
			id: "img-" + index
		});
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	UpImg.newPlaceholder = function() {
		var fileInputArray = UpImg.getFileInputArray();

		if(fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var up = document.createElement("div");
		up.setAttribute('class', 'image-up')
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.id = "img-" + index;
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				for(var temp = 0; temp < UpImg.files.length; temp++) {
					if(UpImg.files[temp].id == closeButton.id) {
						UpImg.files.splice(temp, 1);
					}
				}
				UpImg.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);

		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);

			plus.gallery.pick(function(e) {
				//				console.log("event:"+e);
				var name = e.substr(e.lastIndexOf('/') + 1);
				console.log("name:" + name);

				plus.zip.compressImage({
					src: e,
					dst: '_doc/' + name,
					overwrite: true,
					quality: 50
				}, function(zip) {
					size += zip.size
					console.log("filesize:" + zip.size + ",totalsize:" + size);
					if(size > (10 * 1024 * 1024)) {
						return mui.toast('文件超大,请重新选择~');
					}
					if(fileInputArray.length >= 4) {

						return mui.toast('亲，最多只能传4张');

					}
					if(!self.parentNode.classList.contains('space')) { //已有图片
						UpImg.files.splice(index - 1, 1, {
							name: "images" + index,
							path: e
						});
					} else { //加号
						placeholder.classList.remove('space');
						UpImg.addFile(zip.target);
						UpImg.newPlaceholder();
					}

					up.classList.remove('image-up');
					placeholder.style.backgroundImage = 'url(' + zip.target + ')';
				}, function(zipe) {
					mui.toast('压缩失败！')
				});

			}, function(e) {
				mui.toast(e.message);
			}, {});
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(up);
		placeholder.appendChild(fileInput);
		UpImg.imageList.appendChild(placeholder);
	};
	UpImg.newPlaceholder();

})();

/**
   setPicker
 * 二次封装 mui.picker 2018.3.7  v1.2
 * @param  {Array}   data 展示的数据
 * @param  {String}  resultEle 元素  接收结果的ele
 * @param  {String}  dataKey   数据需要取的值
 * @param  {String}  resultType 字符串  接收结果的方法，text或val,放结果的元素是文本还是input决定
 * @param  {Number}  layer 整形  联动级别
 * @param  {Boolean} isDate 布尔  是否是日期
 * @param  {JSON}    dateOptions  一个日期对象，具体参数太多了。。   需查看mui.dtpicker.js
 */
			;
			(function($, window) {
			
				$.fn.setPicker = function(options) {
					var defaults = {
						data: [],
						dataKey:'text',
						resultEle: '',
						resultType: 'text',
						layer: 1,
						isDate: false,
						dateOptions: {}
					}
					var settings = $.extend({}, defaults, options);
					var _getParam = function(obj, param) {
						return obj[param] || '';
					};
					if(!this.length) {
						return;
					}
					this.on('tap', function() {
			
						var userPicker = null;
			
						if(settings.isDate) {
			
							userPicker = new mui.DtPicker(settings.dateOptions);
			
						} else {
			
							userPicker = new mui.PopPicker({
								layer: settings.layer
							});
							userPicker.setData(settings.data);
			
						}
			
						var result = settings.resultEle;
						result = $(this).find(result).size() ? $(this).find(result) : result;
						userPicker.show(function(items) {
			
							if(settings.isDate) {
			
								$(result)[settings.resultType](items.text);
			
							} else {
			
								var result_items = '';
			
								for(var i = 0, len = items.length; i < len; i++) {
			
									result_items += (_getParam(items[i], settings.dataKey) + ' ');
			
								}
			
								$(result)[settings.resultType](result_items);
			
							}
			
							//销毁
							userPicker.dispose();
							userPicker = null;
			
						});
			
					});
				};
			
			})(jQuery, window);
			

