	//mui 轮播图修正  需放置在调用前
	var benAddBannerImg = (function(selector) {

		var slider = mui(selector);
		for(var i = 0; i < slider.length; i++) {

			if(!slider[i]) {
				continue;
			}
			var banner_group = slider[i].querySelectorAll('.mui-slider-group')[0],
				banner_first = banner_group.firstElementChild.cloneNode(true),
				banner_last = banner_group.lastElementChild.cloneNode(true);

			banner_first.classList.add('mui-slider-item-duplicate');
			banner_last.classList.add('mui-slider-item-duplicate');
			banner_group.appendChild(banner_first);
			banner_group.insertBefore(banner_last, slider[i].querySelectorAll('.mui-slider-item')[0]);
		}

	}('.home_slider'));

	var gallery = mui('#slider');
				gallery.slider({
					interval: 4000
				});
	var gallery2 = mui('#slider2');
				gallery2.slider({
					interval: 0
				});