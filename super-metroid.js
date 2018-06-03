window.addEventListener('load', function () {
	var Q = (window.Q = Quintus({
			audioSupported: ['mp3', 'ogg']
		})
		.include('Sprites, Scenes, Input, 2D, Anim, UI, TMX, Audio')
		.setup("super-metroid")
		.controls()
		.enableSound());

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

	Q.Sprite.extend("Samus", {
		init: function (p) {
			this._super(p, {
				sprite: "samus_anim",
				sheet: "samus_fire",
				x: 700, //3715, //3075, 1540, 3220 x: 1700, y: 1672
				y: 1787,//340, //300, 480, 900
				onAir: false,
				state: 2,   //3: saltando, 2: en pie, 1: agachado, 0: bola
				last_vx: 0,
				last_y: 0,
				last_animation: "stand_right",
				ball: false, // Controla si tiene el power up de la bola
				missile: false, // Controla si tiene el power up de misiles
				selected_weapon: "fire", // Controla el arma seleccionada por el jugador
				scale: 0.85,
			});

			this.add('2d, platformerControls, animation');

			// Trigger de la animacion al morir
			this.on("destroy", function () {
				Q.stageScene("endGame", 1, {
					label: "Has muerto!"
				});
				this.destroy();
			});

			this.on('bump.bottom', this, 'floor');
			Q.input.on('up', this, 'jump');
			Q.input.on('down',this, 'duck');
			Q.input.on("fire", this, "fireWeapon");
			Q.input.on("confirm", this, "changeWeapon");
		},
		step: function (dt) {
			this.checkVelocity();
			this.checkMovement();
		},

		duck: function(){

			// Si no se está saltando o en el estado bola se cambia el estado de Samus
			if(this.p.state > 1 && this.p.state < 3 || (this.p.state == 1 && this.p.ball == true)){
				this.p.state -= 1;
			}

			// Cuando Samus está en modo bola su tamaño cambia
			if(this.p.state == 0){
				this.p.h = 16;
				this.p.w = 16;
				this.p.cy = -8;
				this.p.cx = 0;
				this.p.scale = 1;
			}
		},

		jump: function () {

			// Si se pulsa el boton de salto y no está en estado salto, se aumenta en uno el estado
			if(this.p.state != 3){
				this.p.state += 1;
			}

			// Si se pulsa el botón de salto, no se está en el aire  y está en el estado salto se salta
			if (!this.onAir && this.p.state == 3) {
				this.p.y -= 50;
				this.onAir = true;
			}

			// Cuando Samus deja de usar de ser una bola recupera su tamaño original
			if(this.p.state != 0){
				this.p.cx = 13.5;
				this.p.cy = 24;
				this.p.h = 48;
				this.p.w = 27;
				this.p.scale = 0.85;
			}
		},

		floor: function () {

			// Si estando en el estado de salto se toca el suelo, cambia a estado en pie
			if(this.p.state == 3)
				this.p.state -= 1;

			this.onAir = false;
		},

		// Acción producida al cambiar de arma (Enter)
		changeWeapon: function () {

			if(this.p.missile === true) {
				if (this.p.selected_weapon === "missile") {
					this.p.selected_weapon = "fire";
				} else {
					this.p.selected_weapon = "missile";
				}
			}

		},

		// Acción producida al disparar (Z)
		fireWeapon: function () {
			var p = this.p;
			var posx, posy, vX, vY, sprite, weapon = this.p.selected_weapon, damage = 1;

			switch (p.last_animation) {
				case "fire_down_left":
					sprite = weapon + "_up_left";
					posx = p.x - 28;
					posy = p.y - 25;
					vY = -120;
					vX = -170;
					break;
				case "fire_down_stand_left":
					sprite = weapon + "_up";
					posx = p.x - 3;
					posy = p.y - 35;
					vY = -150;
					vX = 0;
					break;
				case "fire_down_right":
					sprite = weapon + "_up_right";
					posx = p.x + 28;
					posy = p.y - 25;
					vY = -120;
					vX = 170;
					break;
				case "run_right_up":
					sprite = weapon + "_up_right";
					posx = p.x + 28;
					posy = p.y - 30;
					vY = -120;
					vX = 240;
					break;
				case "run_left_up":
					sprite = weapon + "_up_left";
					posx = p.x - 28;
					posy = p.y - 30;
					vY = -120;
					vX = -240;
					break;
				case "run_left":
					sprite = weapon + "_left";
					posx = p.x - 35;
					posy = p.y - 3;
					vY = 0;
					vX = -240;
					break;
				case "run_right":
					sprite = weapon + "_right";
					posx = p.x + 35;
					posy = p.y - 3;
					vY = 0;
					vX = 240;
					break;
				case "stand_left":
					sprite = weapon + "_left";
					posx = p.x - 28;
					posy = p.y - 3;
					vY = 0;
					vX = -240;
					break;
				case "stand_right":
					sprite = weapon + "_right";
					posx = p.x + 28;
					posy = p.y - 3;
					vY = 0;
					vX = 240;
					break;
				case "stand_down_left":
					sprite = weapon + "_up_left";
					posx = p.x - 28;
					posy = p.y + 10;
					vY = 0;
					vX = -240;
					break;
				case "stand_down_right":
					sprite = weapon + "_up_right";
					posx = p.x + 28;
					posy = p.y + 10;
					vY = 0;
					vX = 240;
					break;
			}

			if(weapon == "missile")
				damage = 3;


			this.stage.insert(new Q.Munition({
				sprite: sprite,
				sheet: sprite,
				x: posx,
				y: posy,
				vy: vY,
				vx: vX,
				damage: damage
			}));
		},

		// Controla la velocidad de Samus según su estado
		checkVelocity: function(){

			// Si Samus está agachada no se le permite moverse
			if(this.p.state == 1){
				this.p.vx = 0;
			}

			/* Si Samus no está en estado de salto y no da a saltar,
			se fija velocidad hacia abajo por si se cae hacia abajo */
			else if(this.p.state < 3 && !Q.inputs['up'])
				this.p.vy = 300;

			/* Si Samus no está en estado de salto y se da a saltar,
			se fija velocidad de 0 para no saltar en el cambio de animación */
			if(this.p.state < 3 && Q.inputs['up'])
				this.p.vy = 0;

		},

		// Controla el movimiento de Samus según su estado
		checkMovement: function () {

			// Apuntar
			if(Q.inputs['S']){
				// Si está de pie
				if(this.p.state == 2){
					// Movimiento
					if (this.p.vx != 0) {
						this.p.sheet = "samus_run_up";
						// Corre apuntando hacia la derecha
						if (this.p.vx > 0) this.p.last_animation = "run_right_up";
						// Corre apuntando hacia la izquierda
						else this.p.last_animation = "run_left_up";

						this.p.last_vx = this.p.vx;
					}
					// Estatico
					else {
						this.p.sheet = "samus_fire";
						// Apunta hacia arriba a la derecha
						if (this.p.last_vx >= 0) this.p.last_animation = "stand_right";
						// Apunta hacia arriba a la izquierda
						else this.p.last_animation = "stand_left";
					}
				}

				// Si está agachado
				else if(this.p.state == 1){
					this.p.sheet = "samus_fire4";
					// Apunta a la derecha
					if (Q.inputs['right']) this.p.last_animation = "fire_down_right";
					//  Apunta a la izquierda
					else if (Q.inputs['left']) this.p.last_animation = "fire_down_left";
					// Apunta hacia arriba
					else this.p.last_animation = "fire_down_stand_left";
				}
			}

			else{
				// Esta saltando
				if(this.p.state == 3 && this.p.last_y != this.p.y){
					this.p.last_y = this.p.y;
					if (this.p.vx >= 0) this.p.sheet = "samus_jump_right";
					else this.p.sheet = "samus_jump_left";
					this.p.last_animation = "jump";
				}

				// Esta de pie
				if(this.p.state == 2){
					// Movimiento
					if (this.p.vx != 0) {
						this.p.sheet = "samus_run";
						// Corre hacia la derecha
						if (this.p.vx > 0) this.p.last_animation = "run_right";
						// Corre hacia la izquierda
						else this.p.last_animation = "run_left";
						this.p.last_vx = this.p.vx;
					}
					// Estatico
					else {
						this.p.sheet = "samus_fire";
						if (this.p.last_vx < 0) this.p.last_animation = "stand_left";
						else this.p.last_animation = "stand_right";
					}
				}

				// Esta agachado
				else if(this.p.state == 1){
					this.p.sheet = "samus_down";
					this.p.last_animation = "stand_down_right";
					// Mira hacia la izquierda
					if (Q.inputs['left']) this.p.last_animation = "stand_down_left";
				}

				// Esta rodando
				if(this.p.state == 0 && this.p.ball){
					this.p.sheet = "samus_ball";
					this.p.last_animation = "ball";
					this.p.last_vx = this.p.vx;
				}
			}

			// Ejecuta la animación
			this.play(this.p.last_animation);
		}
	});

	// Q.Sprite.extend('Mario', {
	// 	init: function (p) {
	// 		this._super(p, {
	// 			sheet: 'marioR',
	// 			x: 3320, //3075, 1540, 3220
	// 			y: 900, //300, 480, 900
	// 			ball: false,
	// 			missile: false,
	// 			onAir: false
	// 		});
	// 		this.add('2d, platformerControls');
	// 		this.on('bump.bottom', this, 'floor');
	// 		Q.input.on('up', this, 'jump');
	// 	},
	// 	step: function (dt) {
	// 		console.log(this.p.x);
	// 		console.log(this.p.y);
	// 		// console.log(this.onAir);
	// 	},
	// jump: function () {
	// 	if (!this.onAir) {
	// 		this.p.y -= 50;
	// 		this.onAir = true;
	// 	}
	// },
	// floor: function () {
	// 	this.onAir = false;
	// }
	// });

	Q.Sprite.extend("Munition", {
		init: function (p) {
			this._super(p, {
				x: 0,
				y: 0,
				velx: 0,
				vely: 0,
				gravity: false,
				damage: 1,
			});
			this.add('2d');
			this.on("hit", function (collision) {
				if(!collision.obj.isA('Munition'))
					this.destroy();
			});
		}
	});

	Q.animations('doors', {
		open: {
			frames: [2, 4, 6, 7, 7, 7, 0],
			rate: 1 / 5,
			loop: false
		},
		close: {
			frames: [7, 6, 4, 2, 0],
			rate: 1 / 5,
			loop: false
		},
	})

	Q.Sprite.extend('DoorR', {
		init: function (p) {
			this._super(p, {
				sprite: 'doors',
				sheet: 'rightdoor',
				lock: false
			});
			this.add('animation, tween');
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					this.play('open');
					collision.obj.p.lock = true;
					setTimeout(function () {
						if (collision.obj.p.lock) {
							collision.obj.p.x -= 290;
							collision.obj.p.lock = false;
						}
					}, 500);
				}
			});
		}
	});

	Q.Sprite.extend('DoorL', {
		init: function (p) {
			this._super(p, {
				sprite: 'doors',
				sheet: 'leftdoor',
				lock: false
			});
			this.add('animation, tween');
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					this.play('open');
					collision.obj.p.lock = true;

					setTimeout(function () {
						if (collision.obj.p.lock) {
							collision.obj.p.x += 290;
							collision.obj.p.lock = false;

							// Si se trata de la puerta de acceso a la sala de guardado, se guarda en state los datos de interes
							if(collision.obj.p.x >= 3246 && collision.obj.p.x <= 3260
								&& collision.obj.p.y >= 1530 && collision.obj.p.y <= 1532){
									Q.state.set({save_game: true});
									Q.state.set({hasMissile: collision.obj.missile});
							}
						}
					}, 500);
				}
			});
		}
	});

	Q.Sprite.extend('Ball', {
		init: function (p) {
			this._super(p, {
				sprite: 'shine',
				sheet: 'ball',
				x: 3382,
				y: 920,
				frame: 0
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					collision.obj.p.ball = true;
					this.destroy();
				}
			});
			this.add('animation, tween');
			this.play("shine");
		}
	});

	Q.Sprite.extend('Missile', {
		init: function (p) {
			this._super(p, {
				sprite: 'shine',
				sheet: 'missile',
				x: 1481,
				y: 472,
				frame: 0
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					collision.obj.p.missile = true;
					this.destroy();
				}
			});
			this.add('animation, tween');
			this.play("shine");
		}
	});

	Q.animations('zoomer animation', {
        'zoomerLive': { frames: [0, 1, 2], rate: 1 / 2 },
        'zoomerDie': { frames: [4], loop: false }
    });
    /**
     * Clase que representa al enemigo Zoomer.
     */
    Q.Sprite.extend('Zoomer', {
        init: function(p) {
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
        die: function() {
            this.p.die = true;
            this.p.speed = 0;
            this.p.vx = 0;

            setTimeout(function() {
                Q('Zoomer').destroy();
            }, 200);
        },

        /**
         * En caso de que Mario salte encima de él, el Zoomer muere.
        */
        hit: function(collision) {
            if (collision.obj.isA('Munition')) {
                if(!this.p.collision){
                    this.trigger('die');
                }
            }
        },
        /**
         * En caso de que Mario choque contra él, Mario muere.

        collision: function(collision) {
            if (collision.obj.isA('Mario')) {
                if(!this.p.collision){
                    collision.obj.trigger('die');
                    this.p.collision = true;
                }
            }
        },*/


        /**
         * Ejecuta un paso de Zoomer.
         */
        step: function(dt) {
            if (this.p.die) {
                this.play("zoomerDie");
            } else {
                this.play("zoomerLive");
            }
        }
    });


    Q.animations('skree animation', { // WIPS
    	'live': { frames: [1], loop: false },
        'attack': { frames: [0, 1, 2, 3], rate: 1 / 5 },
        'die': { frames: [4], loop: false }
    });
    /**
     * Clase que representa al enemigo Skree.
     */
    Q.Sprite.extend('Skree', {
        init: function(p) {
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
                collision: false
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
        die: function() {
            this.p.die = true;
            this.p.vy = 70;
            setTimeout(function() {
                Q('Skree').destroy();
            }, 200);
        },

        hit: function(collision) {
            if (collision.obj.isA('Munition')) {
                if(!this.p.collision){
                    this.trigger('die');
                }
            }
        },

        bottom: function(collision) {
        	if (!collision.obj.isA('Samus')) {
                if(!this.p.collision){
                    this.trigger('die');
                }
            }
        },

        step: function(dt) {
            if (this.p.die) {
                this.play('die');
            } else {

                if(Q('Samus')) {
                    var distance = this.p.x - Q('Samus').items[0].p.x;
                }
                else {
                    var distance = 0;
                }

                // Si Samus se acerca por la izquierda
                if(distance < 150 && distance > 0 && this.p.lock) {
                	this.p.lock = false;
                	this.play('attack');
                	this.p.vy = 275;
                	this.p.vx = -175;
                }
                // Si Samus se acerca por la derecha
                else if(distance > -150 && distance < 0 && this.p.lock) {
                	this.p.lock = false;
                	this.play('attack');
                	this.p.vy = 275;
                	this.p.vx = 175;
                }
                else {
                	this.play('live');
                }

                /**
                 * Indicamos el tiempo al que baja el Skree.

                if (this.p.time_jump >= 1.5) {
                    this.p.vy = 70;
                } */
            }
        }
    });


    Q.animations('space_pirate_projectile animation', {
        'fire': { frames: [0, 1], rate: 1 / 1.2 }
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
								scale: 0.60,
                gravity: false,
            });

            this.add('2d, animation');

            this.on("hit", function (collision) {
							if (!collision.obj.isA('SpacePirateProjectile') && !collision.obj.isA('SpacePirate')) {
								this.destroy();
							}
            });
        },

        step: function(dt) {
            this.play('fire');
        }
    });

    Q.animations('space_pirate animation', {
        'patrol': { frames: [1, 2, 1, 0], rate: 1 / 1.2 },
        'walkL': { frames: [3, 2, 1, 0, 11, 10, 9, 8], rate: 1 / 2},
        'walkR': { frames: [0, 1, 2, 3, 8, 9, 10, 11], rate: 1 / 2},
        'fireR': { frames: [0, 1, 2, 3, 4, 4, 4], rate: 1 / 2},
        'fireL': { frames: [4, 3, 2, 1, 0, 0, 0], rate: 1 / 2},
        'die': { frames: [2], loop: false }
    });
    /**
     * Clase que representa al enemigo Space_Pirate.
     */
    Q.Sprite.extend('SpacePirate', {
        init: function(p) {
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
            });
            /**
             * Los módulos Quintus necesarios.
             */
            this.add('2d, animation');
            /**
             * Definición de las funciones adicionales.
             */
            //this.on('bump.top', this, 'top');
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
        die: function() {
            this.p.die = true;
            this.p.speed = 0;
            this.p.vx = 0;

            setTimeout(function() {
                Q('SpacePirate').destroy();
            }, 200);
        },

        /**
         * En caso de que reciba un disparo, el Space_Pirate muere
         */
        hit: function(collision) {
            if (collision.obj.isA('Munition')) {
                if(!this.p.collision){
                    this.trigger('die');
                }

            }
        },
        /**
         * En caso de que Mario choque contra él, Mario muere.

        collision: function(collision) {
            if (collision.obj.isA('Mario')) {
                if(!this.p.collision){
                    collision.obj.trigger('die');
                    this.p.collision = true;
                }
            }
        },*/

        /**
        *   Se detiene, mira a los lados y gira a la izquierda.
        */
        turn_left: function() {
            this.p.direction = 'patrol';

            this.p.vx = 0;
            this.p.sheet = 'space_pirate_patrol_right';

            var array = this.p.array;

            setTimeout(function() {
                Q('SpacePirate').items[array].p.direction = 'right';
                Q('SpacePirate').items[array].p.vx = -100;
                Q('SpacePirate').items[array].p.sheet = 'space_pirate_walk_left';
                Q('SpacePirate').items[array].p.lock = true;
            }, 2000);


        },

        /**
        *   Se detiene, mira a los lados y gira a la derecha.
        */
        turn_right: function() {
            this.p.direction = 'patrol';

            this.p.vx = 0;
            this.p.sheet = 'space_pirate_patrol_left';

            var array = this.p.array;

            setTimeout(function() {
                Q('SpacePirate').items[array].p.direction = 'right';
                Q('SpacePirate').items[array].p.vx = 100;
                Q('SpacePirate').items[array].p.sheet = 'space_pirate_walk_right';
                Q('SpacePirate').items[array].p.lock = true;
            }, 2000);
        },

        fire_left: function() { // WIP
            this.p.direction = 'fireL';
            this.p.vx = 0;
            this.p.sheet = 'space_pirate_fire_left';

			if(this.p.deltaTime >= 60){
				var projectile = new Q.SpacePirateProjectile({x: this.p.x-30, y: this.p.y, vx: -100});
				this.stage.insert(projectile);
				this.p.deltaTime = 0;
			}else{
				this.p.deltaTime = this.p.deltaTime + 1;
			}
        },

        fire_right: function() { // WIP
            this.p.direction = 'fireR';
            this.p.vx = 0;
            this.p.sheet = 'space_pirate_fire_right';

			if(this.p.deltaTime >= 60){
				var projectile = new Q.SpacePirateProjectile({x: this.p.x+30, y: this.p.y, vx: +100});
				this.stage.insert(projectile);
				this.p.deltaTime = 0;
			}else{
				this.p.deltaTime = this.p.deltaTime + 1;
			}
        },

        /**
         * Ejecuta un paso de Space_Pirate.
         */
        step: function(dt) {
            if (this.p.die) {
                this.play('die');
            } else {
                switch(this.p.direction){
                    case 'right': this.play('walkR'); break;
                    case 'left': this.play('walkL'); break;
                    case 'fireR': this.play('fireR'); break;
                    case 'fireL': this.play('fireL'); break;
                    default: this.play('patrol');
                }

                if(Q('Samus')) {
                    var distance = this.p.x - Q('Samus').items[0].p.x;
                }

                else {
                    var distance = 0;
                }

                // Si Samus se acerca por la izquierda
                if(distance < 100 && distance > 0) {
									this.p.patroling = false;
									this.trigger('fire_left');
                }
                // Si Samus se acerca por la derecha
                else if(distance > -100 && distance < 0) {
                	this.p.patroling = false;
									this.trigger('fire_right');
                }
                else if(distance > 280) {
                	this.p.patroling = true;
                    this.p.direction = 'left';
                    this.p.vx = -100;
                    this.p.sheet = 'space_pirate_walk_left';
                }
                else if(distance < -280) {
                	this.p.patroling = true;
                    this.p.direction = 'right';
                    this.p.vx = 100;
                    this.p.sheet = 'space_pirate_walk_right';
                }

                if(this.p.x >= this.p.stop_right && this.p.vx > 0 && this.p.lock) {
                	this.p.lock = false;
                    this.trigger('turn_left');
                }
                else if (this.p.x <= this.p.stop_left && this.p.vx < 0 && this.p.lock) {
                	this.p.lock = false;
                    this.trigger('turn_right');
                }
            }
        }
    });

Q.animations('kraid animation', { // WIPS
    	'live': { frames: [3, 5, 3, 5, 3, 5, 7, 9], rate: 1 / 2 }
    });
    /**
     * Clase que representa al enemigo Skree.
     */
    Q.Sprite.extend('Kraid', {
        init: function(p) {
            this._super(p, {
                sprite: 'kraid animation',
                /**
                 * Sprite del Skree.
                 */
                sheet: 'kraid',

                bullet_cd: 0,
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

        step: function(dt) {
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

    Q.animations('kraid_bullets animation', {
        'fire': { frames: [0], loop: false }
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
            });

            this.add('2d, animation');

            this.on("hit", function (collision) {
							if (!collision.obj.isA('KraidBullet')) {
								this.destroy();
							}
            });
        },

        step: function(dt) {
            this.play('fire');
        }
    });

	// Q.imageData = function (img) {
	// 	var canvas = $("<canvas>").attr({
	// 		width: img.width,
	// 		height: img.height
	// 	})[0];
	// 	var ctx = canvas.getContext("2d");
	// 	ctx.drawImage(img, 0, 0);
	// 	return ctx.getImageData(0, 0, img.width, img.height);
	// }

	Q.animations('shine', {
		shine: {
			frames: [0, 1],
			rate: 1 / 5
		}
	});

	Q.scene('level1', function (stage) {
		Q.stageTMX('zebes.tmx', stage);
		loadDoors(stage);
		Q.state.set({save_game: false});

		stage.insert(new Q.Ball());
		stage.insert(new Q.Missile());
		var samus = stage.insert(new Q.Samus());
		var zoomer = stage.insert(new Q.Zoomer({x: 2323, y: 1160}));
    var skree = stage.insert(new Q.Skree({x: 2144, y: 334}));
    var space_pirate = stage.insert(new Q.SpacePirate({ x: 1700, y: 1672, array: 0, stop_right: 1760, stop_left: 1675 }));
    var kraid = stage.insert(new Q.Kraid({x: 438, y: 1648}));

		stage.add('viewport').follow(samus);
		stage.viewport.scale = 1;
		stage.viewport.offsetY = 80;
	});

	Q.loadTMX(
		'samus.png, samus.json, weapons.png, weapons.json, rightdoor.png, rightdoor.json, leftdoor.png, leftdoor.json, ball.png, ball.json, missile.png, missile.json, zoomer.png, zoomer.json, skree.png, skree.json, space_pirate.png, space_pirate.json, space_pirate_projectile.png, space_pirate_projectile.json, kraid.png, kraid.json, kraid_bullets.png, kraid_bullets.json, kraid_claws.png, kraid_claws.json, zebes.tmx',
		function () {
			Q.compileSheets('samus.png', 'samus.json');
			Q.compileSheets('weapons.png', 'weapons.json');
			Q.compileSheets('rightdoor.png', 'rightdoor.json');
			Q.compileSheets('leftdoor.png', 'leftdoor.json');
			Q.compileSheets('ball.png', 'ball.json');
			Q.compileSheets('missile.png', 'missile.json');
			Q.compileSheets('zoomer.png', 'zoomer.json');
        	Q.compileSheets('skree.png', 'skree.json');
        	Q.compileSheets('space_pirate.png', 'space_pirate.json');
        	Q.compileSheets('space_pirate_projectile.png', 'space_pirate_projectile.json');
        	Q.compileSheets('kraid.png', 'kraid.json');
        	Q.compileSheets('kraid_bullets.png', 'kraid_bullets.json');
        	Q.compileSheets('kraid_claws.png', 'kraid_claws.json');
			Q.stageScene('level1');
		}
	);

 // Esta escena carga la partida desde la sala de guardado cuando Samus muere
	Q.scene('load_game', function (stage) {
		Q.stageTMX('zebes.tmx', stage);
		loadDoors(stage);
		var samus = stage.insert(new Q.Samus({misille: Q.state.get("hasMissile"), ball: true, x: 3402.525, y:1547.6}));
		var space_pirate = stage.insert(new Q.SpacePirate({ x: 1700, y: 1672, array: 0, stop_right: 1760, stop_left: 1675 }));
		var kraid = stage.insert(new Q.Kraid({x: 438, y: 1648}));
		stage.add('viewport').follow(samus);
		stage.viewport.scale = 1;
		stage.viewport.offsetY = 80;
	});

// Llamar a este método cuando muera Samus y se quiere cargar partida en vez de reiniciar
function loadGame(){
	if(Q.state.get("save_game")){
		Q.clearStages();
		Q.stageScene("load_game");
	}
}

function loadDoors(stage){
	stage.insert(
		new Q.DoorR({
			x: 3220,
			y: 448
		})
	);
	stage.insert(
		new Q.DoorL({
			x: 2972,
			y: 448
		})
	);
	stage.insert(
		new Q.DoorR({
			x: 3220,
			y: 896
		})
	);
	stage.insert(
		new Q.DoorL({
			x: 2972,
			y: 896
		})
	);
	stage.insert(
		new Q.DoorR({
			x: 3220,
			y: 1520
		})
	);
	stage.insert(
		new Q.DoorL({
			x: 2972,
			y: 1520
		})
	);
	stage.insert(
		new Q.DoorR({
			x: 1460,
			y: 1616
		})
	);
	stage.insert(
		new Q.DoorL({
			x: 1212,
			y: 1616
		})
	);
};

});
