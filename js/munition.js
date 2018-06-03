function loadMunition(Q) {
	Q.Sprite.extend('Munition', {
		init: function (p) {
			this._super(p, {
				x: 0,
				y: 0,
				velx: 0,
				vely: 0,
				gravity: false,
				damage: 1
			});
			this.add('2d');
			this.on('hit', function (collision) {
				if (!collision.obj.isA('Munition')) this.destroy();
			});
		}
	});
}