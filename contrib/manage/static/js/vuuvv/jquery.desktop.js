(function ($) {
	$.widget("vuuvv.desktop", {
		options: {
			show_dock: true
		},

		_create: function() {
			var self = this;
			this.apps = [];
			for (var i = 0; i < 10; i++) {
				this.apps.push({order: i * 2, img: 'http://2.web.qstatic.com/webqqpic/pubapps/0/2/images/big.png', title: '金山快盘' + i, action: $.noop});
			}
			this.desktop = this.element;
			$(window).resize(function() {
				self._arrange_apps();
				self._arrange_dock();
			});
			this.apps_box = $("<div>").appendTo(this.desktop);
			this._create_apps();
			this._create_dock();
			this._arrange_apps();
			this._arrange_dock();
		},

		_create_dock: function() {
			this.dock = $("<div>").dock().appendTo(this.desktop);
		},

		_arrange_dock: function() {
			this.dock.position({of: this.desktop, at: "bottom", my: "bottom"});
		},

		_create_apps: function() {
			var self = this,
				apps = this.apps,
				_apps = [],
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
				self._adjust_apps_order(before, after);
			}
			for (var i = 0; i < apps.length; i++) {
				var app = apps[i];
				if (app.order >= _apps.length) {
					this._extend_array(_apps, app.order);
				}
				_apps[app.order] = $("<div>").app(app).appendTo(apps_box).draggable({
					containment: this.desktop,
					stop: _dropped
				}).click(function() {
					$("<h1>TEST</h1>").window({theme: "vista"});
				}).data("order", app.order);
			}
			this.apps = _apps
		},

		_extend_array: function(a, length) {
			for (var i = a.length; i <= length; i++) {
				a.push(null);
			}
		},

		_insert_app: function(app, index) {
			var apps = this.apps,
				empty = index;
			if (index >= apps.length) {
				this._extend_array(apps, index);
			}
			while (apps[empty] !== null && empty < apps.length)
				empty++;
			if (empty == apps.length) {
				apps.push(null);
			}
			while(empty !== index) {
				this._replace_app(apps[empty - 1], empty);
				empty = empty - 1;
			}
			this._replace_app(app, empty);
		},

		_remove_app: function(index) {
			var app = this.apps[index];
			this.apps[index] = null;
			return app;
		},

		_replace_app: function(app, index) {
			this.apps[index] = app;
			if (app !== null)
				app.data("order", index);
		},

		_append_app: function(app) {
			var empty = 0,
				apps = this.apps;
			while (apps[empty] === null && empty < apps.length)
				empty++;
			if (empty == apps.length)
				apps.push(app);
			else
				apps[empty] = app;
			app.data("order", empty);
		},

		_adjust_apps_order: function(src, target) {
			var apps = this.apps,
				app = this._remove_app(src);
			if (target >= apps.length) {
				this._extend_array(apps, target);
			}
			if (apps[target] === null) {
				this._replace_app(app, target);
			} else {
				this._insert_app(app, target);
			}

			this._arrange_apps();
		},

		_arrange_apps: function() {
			var height = this.desktop.height() - 70,
				rows = Math.floor(height / 88),
				apps_box = this.apps_box,
				apps = this.apps;

			for (var i = 0; i < apps.length; i++) {
				var app = apps[i];
				if (app !== null) {
					var col = Math.floor(i / rows),
						row = i % rows;
					app.css({
						left: col * 88,
						top: row * 88
					});
				}
			}
		}
	});
})(jQuery);
