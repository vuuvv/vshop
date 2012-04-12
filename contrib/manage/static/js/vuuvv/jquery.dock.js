(function() {

$.widget("vuuvv.dock", {
	options: {
		icon_count: 5,
		icon_size: 70
	},

	_create: function() {
		var options = this.options;
		var length = options.icon_count * options.icon_size;
		var container = this.element.addClass("dock_container").css("width", 30 + 30 + length);
		$("<div>").addClass("dock_container_left").css({top: 0, left: 0}).appendTo(container);
		$("<div>").addClass("dock_container_center").css({top: 0, left: 30, width: length}).appendTo(container);
		$("<div>").addClass("dock_container_right").css({top: 0, right: 0}).appendTo(container);
	}
});

})(jQuery);
