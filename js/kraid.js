function loadKraid(Q) {

	Q.animations('kraid animation', {
		// WIPS
		live: {
			frames: [0, 1, 0, 1, 0, 1, 2, 3],
			rate: 1 / 1.1
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

			this.on('bullet1');
			this.on('bullet2');
			this.on('bullet3');
		},

		bullet1: function(){
        	var bullet1 = new Q.KraidBullet({x: this.p.x + 112, y: this.p.y - 10, vx: +100});
			this.stage.insert(bullet1);
        },

        bullet2: function(){
        	var bullet2 = new Q.KraidBullet({x: this.p.x + 112, y: this.p.y + 50, vx: +100});
			this.stage.insert(bullet2);
        },

		bullet3: function(){
        	var bullet3 = new Q.KraidBullet({x: this.p.x + 112, y: this.p.y + 118, vx: +100});
			this.stage.insert(bullet3);
        },

		step: function (dt) {
			this.play('live');

			if(this.p.bullet_cd == 60) {
			 	this.trigger('bullet1');
			 	this.p.bullet_cd++;
            }
            else if(this.p.bullet_cd == 120) {
			 	this.trigger('bullet3');
			 	this.p.bullet_cd++;
            }
            else if(this.p.bullet_cd == 200) {
			 	this.trigger('bullet2');
            	this.p.bullet_cd = 0;
            }
            else {
            	this.p.bullet_cd++;
            }
		}

	});
}