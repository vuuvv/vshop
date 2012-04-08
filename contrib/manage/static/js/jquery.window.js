(function($) {

var css_choose = function($dom, style) {
	var candicates = Array.prototype.slice.call(arguments, 2);
	var origin = $dom.css(style);
	if ($.inArray(origin, candicates) == -1) {
		$dom.css(style, candicates[0]);
	}
}

var Window = function(options) {
	this.$container = $(options.container);
	options = $.extend({}, Window.options, options||{});
	this.initialize(options)
};

Window.options = {
	width: 200,
	height: 150,
	class_name: "vista",
	left_width: 16,
	right_width: 16,
	top_height: 36,
	bottom_height: 15
};

Window.prototype = {
	initialize: function(options) {
		var w = options.width,
			h = options.height,
			lw = options.left_width,
			rw = options.right_width,
			th = options.top_height,
			bh = options.bottom_height;

		this.options = options;


		var $element = this.$element = $("<div>");
		$element.addClass(options.class_name);
		$element.css({"width": w + lw + rw, "height": h + th + bh});
		css_choose(this.$container, "position", "relative", "absolute");
		this.center();

		this.create_div("left-top", {left: 0, top: 0});
		this.create_div("top", {left: lw, top: 0, width: w});
		this.create_div("right-top", {left: lw + w, top: 0});
		this.create_div("left", {left: 0, top: th, height: h});
		this.create_div("content", {left: lw, top: th});
		this.create_div("right", {left: lw + w, top: th, height: h});
		this.create_div("left-bottom", {left: 0, bottom: 0});
		this.create_div("bottom", {left: lw, bottom: 0, width: w});
		this.create_div("right-bottom", {right: 0, bottom: 0});

		this.$container.append(this.$element);
	},

	create_div: function(class_name, attr) {
		var $dom = $("<div>");
		$dom.addClass(class_name);
		$dom.css(attr);
		this.$element.append($dom);
	},

	center: function() {
		this.$element.css({
			left: (parseInt(this.$container.css("width")) - parseInt(this.$element.css("width"))) / 2,
			top: (parseInt(this.$container.css("height")) - parseInt(this.$element.css("width"))) / 2
		});
	}
};

//$.fn.window = function() {
//	new Window({container: this});
//}

})(jQuery);
(function($){

$.widget("vuuvv.window", {
	options: {
		width: 400,
		height: 300,
		theme: "vista",
		left_width: 15,
		right_width: 15,
		top_height: 36,
		bottom_height: 15,
		container: "body"
	},

	_create: function() {
		var options = this.options,
			w = options.width,
			h = options.height,
			lw = options.left_width,
			rw = options.right_width,
			th = options.top_height,
			bh = options.bottom_height;
			self = this,
			win = (self.win = $("<div>"))
				.addClass("vuuvv-window " + options.theme)
				.css({"width": w + lw + rw, "height": h + th + bh})
				.appendTo(options.container);

		this._create_div("left-top", {left: 0, top: 0});
		this._create_div("top", {left: lw, top: 0, width: w});
		this._create_div("right-top", {left: lw + w, top: 0});
		this._create_div("left", {left: 0, top: th, height: h});
		this._create_div("content", {left: lw, top: th}).append(this.element);
		this._create_div("right", {left: lw + w, top: th, height: h});
		this._create_div("left-bottom", {left: 0, bottom: 0});
		this._create_div("bottom", {left: lw, bottom: 0, width: w});
		this._create_div("right-bottom", {right: 0, bottom: 0});

		self._make_draggable();
	},

	_create_div: function(class_name, attr) {
		var $dom = $("<div>");
		$dom.addClass(class_name);
		$dom.css(attr);
		this.win.append($dom);
		return $dom;
	},

	_make_draggable: function() {
		var self = this,
			options = self.options;

		self.win.draggable({
			handle: ".top"
		});
	}

});

})(jQuery);
