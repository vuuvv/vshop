(function ($) {
	$.widget("vuuvv.desktop", {
		_create: function() {
			this.desktop = this.element;
			this._create_dock();
			this._add_app();
		},

		_create_dock: function() {
			var dock = $("<div>").dock().appendTo(this.desktop).position({of: this.desktop, at: "bottom", my: "bottom"});
		},

		_add_app: function(img) {
			$("<div>").app().appendTo(this.desktop);
		}
	});
})(jQuery);
