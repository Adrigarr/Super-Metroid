function loadBall(Q) {

	Q.Sprite.extend('Ball', {
		init: function (p) {
			this._super(p, {
				sprite: 'shine',
				sheet: 'ball',
				x: 3382,
				y: 920,
				frame: 0
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					collision.obj.p.ball = true;
					Q.audio.play('powerup.mp3');
					this.destroy();
				}
			});
			this.add('animation, tween');
			this.play('shine');
		}
	});

}