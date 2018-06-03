function loadMissile(Q) {

	Q.Sprite.extend('Missile', {
		init: function (p) {
			this._super(p, {
				sprite: 'shine',
				sheet: 'missile',
				x: 1481,
				y: 472,
				frame: 0
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					collision.obj.p.missile = true;
					this.destroy();
				}
			});
			this.add('animation, tween');
			this.play('shine');
		}
	});
	
}