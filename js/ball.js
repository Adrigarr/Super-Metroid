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
					Q.audio.stop('zebes.mp3');
					Q.audio.play('powerup.mp3');
					collision.obj.p.ball = true;
					this.destroy();
					setTimeout(function () {
						Q.audio.play('zebes.mp3');
					}, 5000);
				}
			});
			this.add('animation, tween');
			this.play('shine');
		}
	});

}