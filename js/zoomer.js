function loadZoomer(Q) {

	Q.animations('zoomer animation', {
		zoomerLive: {
			frames: [0, 1, 2],
			rate: 1 / 2
		},
		zoomerDie: {
			frames: [4],
			loop: false
		}
	});

	Q.animations('zoomer_wall_left animation', {
		zoomerLive: {
			frames: [0, 2, 4],
			rate: 1 / 2
		},
		zoomerDie: {
			frames: [6],
			loop: false
		}
	});

	Q.animations('zoomer_wall_right animation', {
		zoomerLive: {
			frames: [11, 9, 7],
			rate: 1 / 2
		},
		zoomerDie: {
			frames: [5],
			loop: false
		}
	});

	/**
	 * Clase que representa al enemigo Zoomer.
	 */
	Q.Sprite.extend('Zoomer', {
		init: function (p) {
			this._super(p, {
				sprite: 'zoomer animation',
				/**
				 * Sprite del Zoomer.
				 */
				sheet: 'zoomer',

				/**
				 * Parámetros de velocidad del Zoomer.
				 */
				speed: 170,
				vx: 50,
				/**
				 * Atributos adicionales.
				 */
				die: false,
				collision: false,
				damage: 2,
				lives: 2,
				wall: false
			});
			/**
			 * Los módulos Quintus necesarios.
			 */
			if(!this.p.wall)
				this.add('2d, animation, aiBounce');
			else {
				this.add('2d, animation');
				this.on('bump.top', this, 'goDown');
				this.on('bump.bottom', this, 'goUp');
			}
			/**
			 * Definición de las funciones adicionales.
			 */
			this.on('bump.left, bump.right, bump.top, bump.bottom', this, 'hit');
			
			this.on('die');
		},
		/**
		 * Muere el Zoomer.
		 */
		die: function () {
			this.p.die = true;
			this.p.speed = 0;
			this.p.vx = 0;

			this.destroy();
		},

		goDown: function (collision) {
			if (!collision.obj.isA('Munition') && !collision.obj.isA('Samus')) {
				this.p.vy = 50;
				
			}
		},

		goUp: function (collision) {
			if (!collision.obj.isA('Munition') && !collision.obj.isA('Samus')) {
				this.p.vy = -50;
				
			}
		},

		/**
		 * En caso de que Mario salte encima de él, el Zoomer muere.
		 */
		hit: function (collision) {
			if (collision.obj.isA('Munition')) {
				this.p.lives -= collision.obj.p.damage;
				if (!this.p.collision && this.p.lives <=0) {
					this.trigger('die');
				}
			}
			else if(collision.obj.isA('Samus')){
				collision.obj.checkLives(this.p.damage);
			}
		},

		/**
		 * Ejecuta un paso de Zoomer.
		 */
		step: function (dt) {
			if (this.p.die) {
				this.play('zoomerDie');
			} else {
				this.play('zoomerLive');
			}
		}
	});
	
}
