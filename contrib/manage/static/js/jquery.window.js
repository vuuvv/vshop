(function($) {

var css_choose = function($dom, style) {
	var candicates = Array.prototype.slice.call(arguments, 2);
	var origin = $dom.css(style);
	if ($.inArray(origin, candicates) == -1) {
		$dom.css(style, candicates[0]);
	}
}

})(jQuery);

(function($){

$.widget("vuuvv.window", {
	options: {
		width: 400,
		height: 300,
		theme: "chrome",
		left_width: 15,
		right_width: 15,
		top_height: 35,
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
			bh = options.bottom_height,
			self = this,
			win = (self.win = $("<div>"))
				.addClass("vuuvv-window " + options.theme)
				.css({"width": w + lw + rw, "height": h + th + bh})
				.appendTo(options.container);

		this._create_div("left-top", {left: 0, top: 0});
		this._create_div("top", {left: lw, top: 0, width: w});
		this._create_div("right-top", {right: 0, top: 0});
		this._create_div("left", {left: 0, top: th, height: h});
		this._create_div("content", {left: lw + 1, top: th + 1}).append(this.element);
		this._create_div("right", {right: 0, top: th, height: h});
		this._create_div("left-bottom", {left: 0, bottom: 0});
		this._create_div("bottom", {left: lw, bottom: 0, width: w});
		this._create_div("right-bottom", {right: 0, bottom: 0});
		this._hoverable($('<div><div class="close"></div></div>').appendTo(self.win));
		this._hoverable($('<div><div class="min"></div></div>').appendTo(self.win));
		this._hoverable($('<div><div class="max"></div></div>').appendTo(self.win));

		self.win.position({
			of: $(options.container)
		});
		self._make_draggable();
	},

	_create_div: function(class_name, css) {
		var $dom = $("<div>");
		$dom.addClass(class_name);
		if (css) 
			$dom.css(css);
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
