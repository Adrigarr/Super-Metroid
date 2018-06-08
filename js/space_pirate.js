function loadSpacePirate(Q) {

	Q.animations('space_pirate animation', {
		patrol: {
			frames: [1, 2, 1, 0],
			rate: 1 / 1.2
		},
		walkL: {
			frames: [3, 2, 1, 0, 11, 10, 9, 8],
			rate: 1 / 2
		},
		walkR: {
			frames: [0, 1, 2, 3, 8, 9, 10, 11],
			rate: 1 / 2
		},
		fireR: {
			frames: [0, 1, 2, 3, 4, 4, 4],
			rate: 1 / 2
		},
		fireL: {
			frames: [4, 3, 2, 1, 0, 0, 0],
			rate: 1 / 2
		},
		die: {
			frames: [2],
			loop: false
		}
	});
	/**
	 * Clase que representa al enemigo Space_Pirate.
	 */
	Q.Sprite.extend('SpacePirate', {
		init: function (p) {
			this._super(p, {
				sprite: 'space_pirate animation',
				/**
				 * Sprite del Space_Pirate.
				 */
				sheet: 'space_pirate_walk_right',
				/**
                 * Posición inicial del Space_Pirate.

                x: 1660,
                y: 500,*/
				/**
				 * Parámetros de velocidad del Space_Pirate.
				 */
				speed: 170,
				vx: 100,
				/**
				 * Atributos adicionales.
				 */
				direction: 'right',
				lock: true,
				die: false,
				collision: false,
				deltaTime: 0,
				damage: 2,
				lives: 2
			});
			/**
			 * Los módulos Quintus necesarios.
			 */
			this.add('2d, animation');
			/**
			 * Definición de las funciones adicionales.
			 */
			this.on('bump.left, bump.right, bump.top, bump.bottom', this, 'hit');
			this.on('fire_left');
			this.on('fire_right');
			this.on('turn_left');
			this.on('turn_right');
			this.on('die');
		},
		/**
		 * Muere el Space_Pirate.
		 */
		die: function () {
			this.p.die = true;
			this.p.speed = 0;
			this.p.vx = 0;

			this.destroy();

		},

		/**
		 * En caso de que reciba un disparo, el Space_Pirate muere
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
		 *   Se detiene, mira a los lados y gira a la izquierda.
		 */
		turn_left: function () {
			this.p.direction = 'patrol';

			this.p.vx = 0;
			this.p.sheet = 'space_pirate_patrol_right';

			var array = this.p.array;

			setTimeout(function () {
				Q('SpacePirate').items[array].p.direction = 'right';
				Q('SpacePirate').items[array].p.vx = -100;
				Q('SpacePirate').items[array].p.sheet = 'space_pirate_walk_left';
				Q('SpacePirate').items[array].p.lock = true;
			}, 2000);
		},

		/**
		 *   Se detiene, mira a los lados y gira a la derecha.
		 */
		turn_right: function () {
			this.p.direction = 'patrol';

			this.p.vx = 0;
			this.p.sheet = 'space_pirate_patrol_left';

			var array = this.p.array;

			setTimeout(function () {
				Q('SpacePirate').items[array].p.direction = 'right';
				Q('SpacePirate').items[array].p.vx = 100;
				Q('SpacePirate').items[array].p.sheet = 'space_pirate_walk_right';
				Q('SpacePirate').items[array].p.lock = true;
			}, 2000);
		},

		fire_left: function () {
			// WIP
			this.p.direction = 'fireL';
			this.p.vx = 0;
			this.p.sheet = 'space_pirate_fire_left';

			if (this.p.deltaTime >= 60) {
				var projectile = new Q.SpacePirateProjectile({
					x: this.p.x - 30,
					y: this.p.y,
					vx: -100
				});
				this.stage.insert(projectile);
				this.p.deltaTime = 0;
				Q.audio.play('space-pirate-proyectile.mp3');
			} else {
				this.p.deltaTime = this.p.deltaTime + 1;
			}
		},

		fire_right: function () {
			// WIP
			this.p.direction = 'fireR';
			this.p.vx = 0;
			this.p.sheet = 'space_pirate_fire_right';
			if (this.p.deltaTime >= 60) {
				var projectile = new Q.SpacePirateProjectile({
					x: this.p.x + 30,
					y: this.p.y,
					vx: +100
				});
				this.stage.insert(projectile);
				this.p.deltaTime = 0;
			} else {
				this.p.deltaTime = this.p.deltaTime + 1;
			}
		},

		/**
		 * Ejecuta un paso de Space_Pirate.
		 */
		step: function (dt) {
			if (this.p.die) {
				this.play('die');
			} else {
				switch (this.p.direction) {
					case 'right':
						this.play('walkR');
						break;
					case 'left':
						this.play('walkL');
						break;
					case 'fireR':
						this.play('fireR');
						break;
					case 'fireL':
						this.play('fireL');
						break;
					default:
						this.play('patrol');
				}

				if (Q('Samus')) {
					var distance = this.p.x - Q('Samus').items[0].p.x;
				} else {
					var distance = 0;
				}

				// Si Samus se acerca por la izquierda
				if (distance < 100 && distance > 0) {
					this.p.patroling = false;
					this.trigger('fire_left');
				}
				// Si Samus se acerca por la derecha
				else if (distance > -100 && distance < 0) {
					this.p.patroling = false;
					this.trigger('fire_right');
				} else if (distance > 280) {
					this.p.patroling = true;
					this.p.direction = 'left';
					this.p.vx = -100;
					this.p.sheet = 'space_pirate_walk_left';
				} else if (distance < -280) {
					this.p.patroling = true;
					this.p.direction = 'right';
					this.p.vx = 100;
					this.p.sheet = 'space_pirate_walk_right';
				}

				if (this.p.x >= this.p.stop_right && this.p.vx > 0 && this.p.lock) {
					this.p.lock = false;
					this.trigger('turn_left');
				} else if (this.p.x <= this.p.stop_left && this.p.vx < 0 && this.p.lock) {
					this.p.lock = false;
					this.trigger('turn_right');
				}
			}
		}
	});

}