(function() {

$.widget("vuuvv.app", {
	options: {
		type: "normal",
		img: "http://2.web.qstatic.com/webqqpic/pubapps/0/2/images/big.png",
		title: ""
	},

	_create: function() {
		var options = this.options,
			app = this.element.addClass("app_" + options.type),
			overlay = $("<div>").css("height", "100%").appendTo(app),
			container = this.container = $("<div>").addClass("app_container").appendTo(overlay);
		if ($.browser.msie) {
			$("<div>").addClass("app_icon").css({
				filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + options.img + "', sizingMethod='scale')"
			}).appendTo(container);
		} else {
			$("<img>").addClass("app_icon").attr({
				src: options.img
			}).appendTo(container);
		}
		$("<div>").addClass("app_name").appendTo(container).text(options.title);
		this._hoverable(overlay);
	}
});

})(jQuery);
