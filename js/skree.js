function loadSkree(Q) {

	Q.animations('skree animation', {
		live: {
			frames: [1],
			loop: false
		},
		attack: {
			frames: [0, 1, 2, 3],
			rate: 1 / 5
		},
		die: {
			frames: [4],
			loop: false
		}
	});
	/**
	 * Clase que representa al enemigo Skree.
	 */
	Q.Sprite.extend('Skree', {
		init: function (p) {
			this._super(p, {
				sprite: 'skree animation',
				/**
				 * Sprite del Skree.
				 */
				sheet: 'skree',
				/**
				 * Parámetros de velocidad del Skree.
				 */
				gravityX: 0,
				gravityY: -100,
				/**
				 * Atributos adicionales.
				 */
				lock: true,
				die: false,
				collision: false,
				damage: 1
			});
			/**
			 * Los módulos Quintus necesarios.
			 */
			this.add('2d, animation');
			/**
			 * Definición de las funciones adicionales.
			 */
			//this.on('bump.bottom', this, 'bottom');
			this.on('bump.bottom, bump.right, bump.left', this, 'die'); // WIP cambiar cuando se implemente el sistema de vidas
			this.on('die');
		},
		/**
		 * Muere el Skree.
		 */
		die: function (collision) {
			
			this.p.vy = 70;
			
			if(collision.obj.isA('Samus')) 
				collision.obj.checkLives(this.p.damage);

			this.destroy();
		},

		hit: function (collision) {
			if (collision.obj.isA('Munition')) {
				if (!this.p.collision) {
					this.trigger('die');
				}
			}
		},

		bottom: function (collision) {
			if (!collision.obj.isA('Samus')) {
				if (!this.p.collision) {
					this.trigger('die');
				}
			}
		},

		step: function (dt) {
			if (this.p.die) {
				this.play('die');
			} else {
				if (Q('Samus')) {
					var distance = this.p.x - Q('Samus').items[0].p.x;
				} else {
					var distance = 0;
				}

				// Si Samus se acerca por la izquierda
				if (distance < 150 && distance > 0 && this.p.lock) {
					this.p.lock = false;
					this.play('attack');
					Q.audio.play('skree.mp3');
					this.p.vy = 275;
					this.p.vx = -175;
				}
				// Si Samus se acerca por la derecha
				else if (distance > -150 && distance < 0 && this.p.lock) {
					this.p.lock = false;
					this.play('attack');
					Q.audio.play('skree.mp3');
					this.p.vy = 275;
					this.p.vx = 175;
				} else {
					this.play('live');
				}

			}
		}
	});

}