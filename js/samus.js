function loadSamus(Q) {

	Q.animations('samus_anim', {
		stand_left: {
			frames: [5, 4, 3],
			rate: 1 / 3
		},
		stand_right: {
			frames: [6, 7, 8],
			rate: 1 / 3
		},
		fire_stand_left: {
			frames: [5],
			rate: 1
		},
		fire_stand_right: {
			frames: [6],
			rate: 1
		},
		fire_up_left: {
			frames: [0],
			rate: 1
		},
		fire_up_right: {
			frames: [1],
			rate: 1
		},
		fire_up_left2: {
			frames: [0],
			rate: 1
		},
		fire_up_right2: {
			frames: [1],
			rate: 1
		},
		fire_down_left: {
			frames: [3],
			rate: 1
		},
		fire_down_right: {
			frames: [0],
			rate: 1
		},
		fire_down_stand_left: {
			frames: [2],
			rate: 1
		},
		fire_down_stand_right: {
			frames: [1],
			rate: 1
		},
		run_left: {
			frames: [3, 2, 1, 0],
			rate: 1 / 4
		},
		run_right: {
			frames: [4, 5, 6, 7],
			rate: 1 / 4
		},
		run_left_up: {
			frames: [3, 2, 1, 0],
			rate: 1 / 4
		},
		run_right_up: {
			frames: [4, 5, 6, 7],
			rate: 1 / 4
		},
		stand_down_left: {
			frames: [0, 1, 2],
			rate: 1
		},
		stand_down_right: {
			frames: [3, 4, 5],
			rate: 1
		},
		jump: {
			frames: [0, 1, 2, 3, 4, 5, 6, 7],
			rate: 1 / 6
		},
		ball: {
			frames: [0, 1, 2, 3, 4, 5, 6, 7],
			rate: 1 / 6
		}
	});

	Q.Sprite.extend('Samus', {
		init: function (p) {
			this._super(p, {
				sprite: 'samus_anim',
				sheet: 'samus_fire',
				w: 1,
				x: 3715, //3075, 1540, 3220 x: 1700, y: 1672
				y: 340, //300, 480, 900
				onAir: false,
				state: 2, //3: saltando, 2: en pie, 1: agachado, 0: bola
				last_vx: 0,
				last_y: 0,
				last_animation: 'stand_right',
				ball: false, // Controla si tiene el power up de la bola
				missile: false, // Controla si tiene el power up de misiles
				selected_weapon: 'fire', // Controla el arma seleccionada por el jugador
				scale: 0.85,
				battle: false
			});

			this.add('2d, platformerControls, animation');

			// Trigger de la animacion al morir
			this.on('destroy', function () {
				Q.stageScene('endGame', 1, {
					label: 'Has muerto!'
				});
				this.destroy();
			});

			this.on('bump.bottom', this, 'floor');
			this.on('tpL', this, 'teleportLeft');
			this.on('tpR', this, 'teleportRight');
			Q.input.on('up', this, 'jump');
			Q.input.on('down', this, 'duck');
			Q.input.on('fire', this, 'fireWeapon');
			Q.input.on('confirm', this, 'changeWeapon');
		},

		teleportLeft: function () {
			this.p.x -= 290;
		},

		teleportRight: function () {
			this.p.x += 290;
		},

		step: function (dt) {
			this.checkVelocity();
			this.checkMovement();
			if (!this.onAir) {
				Q.audio.stop('jump.mp3');
			}

			if (this.p.x < 1000) {
				Q.audio.stop('zebes.mp3');
				if (!this.battle) {
					Q.audio.play('kraid-battle.mp3');
					this.battle = true;
				}
			}
			console.log(this.p.x);
		},

		duck: function () {
			// Si no se está saltando o en el estado bola se cambia el estado de Samus
			if ((this.p.state > 1 && this.p.state < 3) || (this.p.state == 1 && this.p.ball == true)) {
				this.p.state -= 1;
			}

			// Cuando Samus está en modo bola su tamaño cambia
			if (this.p.state == 0) {
				this.p.h = 16;
				this.p.w = 16;
				this.p.cy = -8;
				this.p.cx = 0;
				this.p.scale = 1;
			}
		},

		jump: function () {
			// Si se pulsa el boton de salto y no está en estado salto, se aumenta en uno el estado
			if (this.p.state != 3) {
				this.p.state += 1;
			}

			// Si se pulsa el botón de salto, no se está en el aire y está en el estado salto se salta
			if (!this.onAir && this.p.state == 3) {
				this.p.y -= 50;
				this.onAir = true;
				Q.audio.play('jump.mp3');
			}

			// Cuando Samus deja de ser una bola recupera su tamaño original
			if (this.p.state != 0) {
				this.p.cx = 13.5;
				this.p.cy = 24;
				this.p.h = 48;
				this.p.w = 27;
				this.p.scale = 0.85;
			}
		},

		floor: function () {
			// Si estando en el estado de salto se toca el suelo, cambia a estado en pie
			if (this.p.state == 3) this.p.state -= 1;

			this.onAir = false;
		},

		// Acción producida al cambiar de arma (Enter)
		changeWeapon: function () {
			if (this.p.missile === true) {
				if (this.p.selected_weapon === 'missile') {
					this.p.selected_weapon = 'fire';
				} else {
					this.p.selected_weapon = 'missile';
				}
			}
		},

		// Acción producida al disparar (Z)
		fireWeapon: function () {
			var p = this.p;
			var posx,
				posy,
				vX,
				vY,
				sprite,
				weapon = this.p.selected_weapon,
				damage = 1;

			switch (p.last_animation) {
				case 'fire_down_left':
					sprite = weapon + '_up_left';
					posx = p.x - 28;
					posy = p.y - 25;
					vY = -120;
					vX = -170;
					break;
				case 'fire_down_stand_left':
					sprite = weapon + '_up';
					posx = p.x - 3;
					posy = p.y - 35;
					vY = -150;
					vX = 0;
					break;
				case 'fire_down_right':
					sprite = weapon + '_up_right';
					posx = p.x + 28;
					posy = p.y - 25;
					vY = -120;
					vX = 170;
					break;
				case 'run_right_up':
					sprite = weapon + '_up_right';
					posx = p.x + 28;
					posy = p.y - 30;
					vY = -120;
					vX = 240;
					break;
				case 'run_left_up':
					sprite = weapon + '_up_left';
					posx = p.x - 28;
					posy = p.y - 30;
					vY = -120;
					vX = -240;
					break;
				case 'run_left':
					sprite = weapon + '_left';
					posx = p.x - 35;
					posy = p.y - 3;
					vY = 0;
					vX = -240;
					break;
				case 'run_right':
					sprite = weapon + '_right';
					posx = p.x + 35;
					posy = p.y - 3;
					vY = 0;
					vX = 240;
					break;
				case 'stand_left':
					sprite = weapon + '_left';
					posx = p.x - 28;
					posy = p.y - 3;
					vY = 0;
					vX = -240;
					break;
				case 'stand_right':
					sprite = weapon + '_right';
					posx = p.x + 28;
					posy = p.y - 3;
					vY = 0;
					vX = 240;
					break;
				case 'stand_down_left':
					sprite = weapon + '_up_left';
					posx = p.x - 28;
					posy = p.y + 10;
					vY = 0;
					vX = -240;
					break;
				case 'stand_down_right':
					sprite = weapon + '_up_right';
					posx = p.x + 28;
					posy = p.y + 10;
					vY = 0;
					vX = 240;
					break;
			}

			if (weapon == 'missile') {
				damage = 3;
				Q.audio.play('missile.mp3');
			} else {
				Q.audio.play('shoot.mp3');
			}

			this.stage.insert(
				new Q.Munition({
					sprite: sprite,
					sheet: sprite,
					x: posx,
					y: posy,
					vy: vY,
					vx: vX,
					damage: damage
				})
			);
		},

		// Controla la velocidad de Samus según su estado
		checkVelocity: function () {
			// Si Samus está agachada no se le permite moverse
			if (this.p.state == 1) {
				this.p.vx = 0;
			} else if (this.p.state < 3 && !Q.inputs['up']) this.p.vy = 300;

			/* Si Samus no está en estado de salto y no da a saltar,
			se fija velocidad hacia abajo por si se cae hacia abajo */

			/* Si Samus no está en estado de salto y se da a saltar,
			se fija velocidad de 0 para no saltar en el cambio de animación */
			if (this.p.state < 3 && Q.inputs['up']) this.p.vy = 0;
		},

		// Controla el movimiento de Samus según su estado
		checkMovement: function () {
			// Apuntar
			if (Q.inputs['S']) {
				// Si está de pie
				if (this.p.state == 2) {
					// Movimiento
					if (this.p.vx != 0) {
						this.p.sheet = 'samus_run_up';
						// Corre apuntando hacia la derecha
						if (this.p.vx > 0) this.p.last_animation = 'run_right_up';
						// Corre apuntando hacia la izquierda
						else this.p.last_animation = 'run_left_up';

						this.p.last_vx = this.p.vx;
					}
					// Estatico
					else {
						this.p.sheet = 'samus_fire';
						// Apunta hacia arriba a la derecha
						if (this.p.last_vx >= 0) this.p.last_animation = 'stand_right';
						// Apunta hacia arriba a la izquierda
						else this.p.last_animation = 'stand_left';
					}
				}

				// Si está agachado
				else if (this.p.state == 1) {
					this.p.sheet = 'samus_fire4';
					// Apunta a la derecha
					if (Q.inputs['right']) this.p.last_animation = 'fire_down_right';
					//  Apunta a la izquierda
					else if (Q.inputs['left']) this.p.last_animation = 'fire_down_left';
					// Apunta hacia arriba
					else this.p.last_animation = 'fire_down_stand_left';
				}
			} else {
				// Esta saltando
				if (this.p.state == 3 && this.p.last_y != this.p.y) {
					this.p.last_y = this.p.y;
					if (this.p.vx >= 0) this.p.sheet = 'samus_jump_right';
					else this.p.sheet = 'samus_jump_left';
					this.p.last_animation = 'jump';
				}

				// Esta de pie
				if (this.p.state == 2) {
					// Movimiento
					if (this.p.vx != 0) {
						this.p.sheet = 'samus_run';
						// Corre hacia la derecha
						if (this.p.vx > 0) this.p.last_animation = 'run_right';
						// Corre hacia la izquierda
						else this.p.last_animation = 'run_left';
						this.p.last_vx = this.p.vx;
					}
					// Estatico
					else {
						this.p.sheet = 'samus_fire';
						if (this.p.last_vx < 0) this.p.last_animation = 'stand_left';
						else this.p.last_animation = 'stand_right';
					}
				}

				// Esta agachado
				else if (this.p.state == 1) {
					this.p.sheet = 'samus_down';
					this.p.last_animation = 'stand_down_right';
					// Mira hacia la izquierda
					if (Q.inputs['left']) this.p.last_animation = 'stand_down_left';
				}

				// Esta rodando
				if (this.p.state == 0 && this.p.ball) {
					this.p.sheet = 'samus_ball';
					this.p.last_animation = 'ball';
					this.p.last_vx = this.p.vx;
				}
			}

			// Ejecuta la animación
			this.play(this.p.last_animation);
		}
	});

}