(function() {

$.widget("vuuvv.app", {
	options: {
		type: "normal",
		img: "",
		title: ""
	},

	_create: function() {
		var options = this.options,
			app = this.element.addClass("app_" + options.type),
			overlay = $("<div>").appendTo(app),
			container = this.container = $("<div>").addClass("app_container").appendTo(overlay);
		$("<div>").addClass("app_icon").css({
			background: "url(" + options.img + ") no-repeat"
		}).appendTo(container);
		this._hoverable(overlay);
	}
});

})(jQuery);
