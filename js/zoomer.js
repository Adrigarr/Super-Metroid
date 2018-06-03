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
				collision: false
			});
			/**
			 * Los módulos Quintus necesarios.
			 */
			this.add('2d, animation, aiBounce');
			/**
			 * Definición de las funciones adicionales.
			 */
			//this.on('bump.top', this, 'top');
			this.on('bump.left, bump.right, bump.top', this, 'hit');
			this.on('die');
		},
		/**
		 * Muere el Zoomer.
		 */
		die: function () {
			this.p.die = true;
			this.p.speed = 0;
			this.p.vx = 0;

			setTimeout(function () {
				Q('Zoomer').destroy();
			}, 200);
		},

		/**
		 * En caso de que Mario salte encima de él, el Zoomer muere.
		 */
		hit: function (collision) {
			if (collision.obj.isA('Munition')) {
				if (!this.p.collision) {
					this.trigger('die');
				}
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