(function ($) {
	$.widget("vuuvv.desktop", {
		options: {
			show_dock: true
		},

		_create: function() {
			this.apps = [];
			for (var i = 0; i < 30; i++) {
				this.apps.push({order: i * 2, img: 'http://2.web.qstatic.com/webqqpic/pubapps/0/2/images/big.png', title: '金山快盘' + i, action: $.noop});
			}
			this.desktop = this.element;
			this.apps_box = $("<div>").appendTo(this.desktop);
			this._create_dock();
			this._create_apps();
			this._arrange_apps();
		},

		_create_dock: function() {
			var dock = $("<div>").dock().appendTo(this.desktop).position({of: this.desktop, at: "bottom", my: "bottom"});
		},

		_create_apps: function() {
			var self = this,
				apps = this.apps,
				_apps = {},
				apps_box = this.apps_box;
			var _dropped = function(event) {
				var height = self.desktop.height() - 70,
					before = $(this).data("order"),
					rows = Math.floor(height / 88),
					row = Math.floor(event.pageY / 88),
					col = Math.floor(event.pageX / 88),
					after = col * rows + row;
				if (before == after) {
					$(this).css({
						left: col * 88,
						top: row * 88
					});
					return;
				}
				console.log(before, after);
				self._adjust_apps_order(before, after);
			}
			for (var i = 0; i < apps.length; i++) {
				var app = apps[i];
				_apps[app.order] = $("<div>").app(app).appendTo(apps_box).draggable({
					containment: this.desktop,
					stop: _dropped
				}).data("order", app.order);
			}
			this.apps = _apps
		},

		_adjust_apps_order: function(before, after) {
			var apps = this.apps;

			if (!(after in apps)) {
				apps[after] = apps[before];
				apps[after].data("order", after);
				delete apps[before];
			} else {
				var temp;
				if (before > after) {
					temp = before;
					before = after;
					after = temp;
				}
				temp = apps[before];
				delete apps[before];
				for (var i = before + 1; i <= after; i++) {
					if (i in apps) {
						apps[i-1] = apps[i];
						apps[i-1].data("order", i-1);
					}
					delete apps[i];
				}
				temp.data("order", after);
				apps[after] = temp;
			}
			this._arrange_apps();
		},

		_arrange_apps: function() {
			var height = this.desktop.height() - 70,
				rows = Math.floor(height / 88),
				apps_box = this.apps_box,
				apps = this.apps;

			for (var i in apps) {
				var app = apps[i],
					order = app.data("order"),
					col = Math.floor(order / rows),
					row = order % rows;
				app.css({
					left: col * 88,
					top: row * 88
				});
			}
		}
	});
})(jQuery);
