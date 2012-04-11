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

var change_size = function($dom, origin_size, dx, dy) {
	$dom.css({
		width: origin_size.width + dx,
		height: origin_size.height + dy
	});
}

$.widget("vuuvv.window", {
	options: {
		title: "",
		container: "body",
		resizable: true,
		draggable: true,
		width: 400,
		height: 300,
		left_width: 16,
		right_width: 16,
		top_height: 35,
		bottom_height: 15,
		theme: "vista"
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
		self._left_top = this._create_div("left-top", {left: 0, top: 0});
		self._top = this._create_div("top", {left: lw - 1, top: 0, width: w + 2});
		self._right_top = this._create_div("right-top", {right: 0, top: 0});
		self._left = this._create_div("left", {left: 0, top: th, height: h}).text(" ");
		self._content = this._create_div("content", {left: lw, top: th + 1, width: w, height: h}).append(this.element);
		self._right = this._create_div("right", {right: 0, top: th, height: h}).text(" ");
		self._left_bottom = this._create_div("left-bottom", {left: 0, bottom: 0});
		self._bottom = this._create_div("bottom", {left: lw - 1, bottom: 0, width: w + 1});
		self._right_bottom = this._create_div("right-bottom", {right: 0, bottom: 0});
		self._title = this._create_div("title", {left: 0, top: 0, width: w});

		var close = $('<div><div class="close"></div></div>').appendTo(self.win);
		self._hoverable(close);
		var min = $('<div><div class="min"></div></div>').appendTo(self.win);
		self._hoverable(min);
		var max = $('<div><div class="max"></div></div>').appendTo(self.win);
		self._hoverable(max);

		self.win.position({
			of: $(options.container)
		});

		if ( options.draggable && $.fn.draggable ) {
			self._make_draggable();
		}
		if ( options.resizable && $.fn.resizable ) {
			self._make_resizable();
		}
	},

	_create_div: function(class_name, css) {
		var $dom = $("<div>");
		$dom.addClass(class_name);
		if (css) 
			$dom.css(css);
		this.win.append($dom);
		return $dom;
	},

	_make_resizable: function() {
		var self = this;
		self._resize_x = self._create_div("resize-x", {right: 5, top: self._right.css("top"), height: self._right.height()}).text(" ");
		self._resize_y = self._create_div("resize-y", {left: self._bottom.css("left"), bottom: 5, width: self._bottom.width()}).text(" ");
		self._resize = self._create_div("resize", {right: 5, bottom: 5}).text(" ");
		this.win.resizable({
			minWidth: 150,
			minHeight: 51,
			handles: {
				s: self._resize_y.addClass("ui-resizable-handle ui-resizable-s"),
				e: self._resize_x.addClass("ui-resizable-handle ui-resizable-e"),
				se: self._resize.addClass("ui-resizable-handle ui-resizable-se")
			},

			resize: function(event, ui) {
				self._left.css("height", self.win.height() - self._left_top.height() - self._left_bottom.height());
				self._right.css("height", self.win.height() - self._right_top.height() - self._right_bottom.height());
				self._top.css("width", self.win.width() - self._left_top.width() - self._right_top.width());
				self._bottom.css("width", self.win.width() - self._left_bottom.width() - self._right_bottom.width());
				self._resize_x.css("height", self._right.css("height"));
				self._resize_y.css("width", self._bottom.css("width"));
				self._title.css("width", self._top.css("width"));
				self._content.css({"width": self.win.width() - self.options.left_width - self.options.right_width, "height": self.win.height() - self.options.top_height - self.options.bottom_height})
			}
		});
	},

	_make_draggable: function() {
		var self = this,
			options = self.options;

		self.win.draggable({
			handle: ".title"
		});
	}

});

})(jQuery);
