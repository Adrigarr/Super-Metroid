function loadSpacePirateProjectile(Q) {

	Q.animations('space_pirate_projectile animation', {
		fire: {
			frames: [0, 1],
			rate: 1 / 1.2
		}
	});

	Q.Sprite.extend('SpacePirateProjectile', {
		init: function (p) {
			this._super(p, {
				sprite: 'space_pirate_projectile animation',
				sheet: 'space_pirate_projectile',
				x: 0,
				y: 0,
				vx: 0,
				vy: 0,
				scale: 0.6,
				gravity: false,
				damage: 2
			});

			this.add('2d, animation');

			this.on('hit', function (collision) {
				if (!collision.obj.isA('SpacePirateProjectile') && !collision.obj.isA('SpacePirate')) {
					this.destroy();
					if(collision.obj.isA('Samus')){
						collision.obj.checkLives(this.p.damage);
					}
				}
			});
		},

		step: function (dt) {
			this.play('fire');
		}
	});
	
}