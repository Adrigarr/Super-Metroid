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
			this.add('2d, animation');

			this.on('endAnim');

			this.on('hit', function (collision) {

				if (!collision.obj.isA("KraidBullet") && !collision.obj.isA("SpacePirateProjectile")) {
					this.p.sprite = 'samus_anim';

					if(this.p.weapon == 'missile') {
						this.p.y -= 8;
						this.p.vx = 0;
						this.p.vy = 0;
						this.p.sheet = 'missile_explosion';
						this.play('missile_explosion');
					}

					else {
						this.p.vx = 0;
						this.p.vy = 0;
						this.p.sheet = 'fire_explosion';
						this.play('fire_explosion');
					}
				}
				else {
					this.trigger('endAnim');
				}
			});
		},

		endAnim: function () {
			this.destroy();
		}

	});
}