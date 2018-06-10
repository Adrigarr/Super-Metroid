function loadKraidBullet(Q) {

	Q.animations('kraid_bullets animation', {
		'fire': {
			frames: [0],
			loop: false
		}
	});


	Q.Sprite.extend('KraidBullet', {
		init: function (p) {
			this._super(p, {
				sprite: 'kraid_bullets animation',
				sheet: 'kraid_bullets',
				x: 0,
				y: 0,
				vx: 0,
				vy: 0,
				scale: 0.60,
				gravity: false,
				damage: 2
			});

			this.add('2d, animation');

			this.on("hit", function (collision) {

				this.p.vx = 100;
				if (!collision.obj.isA('Munition')) {
					this.destroy();

					if (collision.obj.isA("Samus"))
						collision.obj.checkLives(this.p.damage);
				}

			});
		},

		step: function (dt) {
			this.play('fire');
		}

	});

}