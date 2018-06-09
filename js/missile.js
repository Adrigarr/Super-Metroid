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
				Q.audio.stop('zebes.mp3');
				Q.audio.play('powerup.mp3');
				collision.obj.p.missile = true;
				Q.stageScene('hud_missile', 4, {asset: "missileOff.png"});
				this.destroy();
				setTimeout(function () {
					Q.audio.play('zebes.mp3');
				}, 5000);
			});
			this.add('animation, tween');
			this.play('shine');
		}
	});

}