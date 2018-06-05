function loadKraid(Q) {

	Q.animations('kraid animation', {
		// WIPS
		live: {
			frames: [3, 5, 3, 5, 3, 5, 7, 9],
			rate: 1 / 2
		}
	});
	/**
	 * Clase que representa al enemigo Skree.
	 */
	Q.Sprite.extend('Kraid', {
		init: function (p) {
			this._super(p, {
				sprite: 'kraid animation',
				/**
				 * Sprite del Skree.
				 */
				sheet: 'kraid',
				bullet_cd: 0
			});
			/**
			 * Los módulos Quintus necesarios.
			 */
			this.add('2d, animation');
		},

		bullet: function(){
        	console.log('hey');
        	var bullet = new Q.KraidBullet({x: this.p.x+100, y: this.p.y, vx: +100});
			this.stage.insert(bullet);
        },

		step: function (dt) {
			this.play('live');

			 if(this.p.bullet_cd == 60) {
			 	this.trigger('bullet'); // WIP
            	this.p.bullet_cd = 0;
            }
            else {
            	this.p.bullet_cd++;
            }
		}

	});
}