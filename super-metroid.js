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
				x: 3728, //3075, 1540, 3220
				y: 488, //300, 480, 900
				onAir: false,
				last_vx: 0,
				last_y: 0,
				last_animation: "stand_right",
				ball: false, // Controla si tiene el power up de la bola
				missile: false, // Controla si tiene el power up de misiles
				selected_weapon: "fire", // Controla el arma seleccionada por el jugador
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

			Q.input.on("fire", this, "fireWeapon");
			Q.input.on("confirm", this, "changeWeapon");
		},
		step: function (dt) {
			this.checkMovement();
		},
		jump: function () {
			if (!this.onAir && !Q.inputs['P'] && !Q.inputs['down']) {
				this.p.y -= 50;
				this.onAir = true;
			}
		},
		floor: function () {
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
			}else{
			}
		},

		// Acción producida al disparar (Z)
		fireWeapon: function () {
			var p = this.p;
			var posx, posy, vX, vY, sprite, weapon = this.p.selected_weapon;

			// Ver tambien si estan seleccionados los misiles o disparos en el futuro
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

			this.stage.insert(new Q.Weapon({
				sprite: sprite,
				sheet: sprite,
				x: posx,
				y: posy,
				vy: vY,
				vx: vX
			}));
		},

		// Controla todo lo relacionado con el movimiento
		checkMovement: function () {

			if(!Q.inputs['P'] && this.p.h != 48){
				this.p.cx = 13.5;
				this.p.cy = 24;
				this.p.h = 48;
				this.p.w = 27;
			}

			// Mira arriba
			if (Q.inputs['S'] && !Q.inputs['down']) {
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

			// Mira abajo
			else if (Q.inputs['down'] && !Q.inputs['P']) {
				this.p.vx = 0;
				this.p.vy = 0;
				if (!Q.inputs['S']) {
					this.p.sheet = "samus_down";
					this.p.last_animation = "stand_down_right";
					// Mira hacia la izquierda
					if (Q.inputs['left']) this.p.last_animation = "stand_down_left";
				} else {
					this.p.sheet = "samus_fire4";
					// Apunta a la derecha
					if (Q.inputs['right']) this.p.last_animation = "fire_down_right";
					//  Apunta a la izquierda
					else if (Q.inputs['left']) this.p.last_animation = "fire_down_left";
					// Apunta hacia arriba
					else this.p.last_animation = "fire_down_stand_left";
				}
			}

			// Salta
			else if (Q.inputs['up'] && this.p.last_y != this.p.y && !Q.inputs['P']) {
				this.p.last_y = this.p.y;
				if (this.p.vx >= 0) this.p.sheet = "samus_jump_right";
				else this.p.sheet = "samus_jump_left";
				this.p.last_animation = "jump";
			} else if (Q.inputs['P'] && this.p.ball) {
				this.p.vy = 50;
				this.p.h = 16;
				this.p.w = 16;
				this.p.cy = -8;
				this.p.cx = -8;
				this.p.sheet = "samus_ball";
				this.p.last_animation = "ball";
				this.p.last_vx = this.p.vx;
			}

			// Normal
			else {
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

	Q.Sprite.extend("Weapon", {
		init: function (p) {
			this._super(p, {
				x: 0,
				y: 0,
				velx: 0,
				vely: 0,
				gravity: false,
			});
			this.add('2d');
			this.on("hit", function (collision) {
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
            if (collision.obj.isA('Weapon')) {
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


    Q.animations('skree animation', {
        'live': { frames: [0, 1, 2, 3], rate: 1 / 2 },
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
                 * Posición inicial del Skree.
                 */
                x: 1190,
                y: 500,
                /**
                 * Parámetros de velocidad del Skree.
                 */
                 gravityY: -10,
                /**
                 * Atributos adicionales.
                 */
                time_jump: 0,
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

        step: function(dt) {
            if (this.p.die) {
                this.play('die');
            } else {
                this.play('live');
                this.p.time_jump += dt;
                /**
                 * Si toca está en el suelo, salta.
                 */
                if (this.p.vy == 0) {
                    this.p.vy = -70;
                    this.p.time_jump = 0;
                }
                /**
                 * Indicamos el tiempo al que baja el Skree.
                 */
                if (this.p.time_jump >= 1.5) {
                    this.p.vy = 70;
                }
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
                vy: 0,
                gravity: false,

            });

            this.add('2d, animation');

            this.on("hit", function (collision) {
                this.destroy();
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
            //this.on('bump.top', this, 'top');
            this.on('bump', this, 'hit');
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
            if (collision.obj.isA('Weapon')) {
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
            }, 2000);
        },

        fire_left: function() { // WIP
            this.p.direction = 'fireL';

            this.p.vx = 0;
            this.p.sheet = 'space_pirate_fire_left';

            var p = this.p;

            //var projectile = this.stage.insert(new Q.SpacePirateProjectile({x: p.x-20, y: p.y-20, vx: -100}));
        },

        fire_right: function() { // WIP
            this.p.direction = 'fireR';

            this.p.vx = 0;
            this.p.sheet = 'space_pirate_fire_right';
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

                if(distance < 70 && distance > 0) {
                    this.trigger('fire_left');
                }
                else if(distance > -70 && distance < 0) {
                    this.trigger('fire_right');
                }
                else if(distance > 200) {
                    this.p.direction = 'left';
                    this.p.vx = -100;
                    this.p.sheet = 'space_pirate_walk_left';
                }
                else if(distance < -200) {
                    this.p.direction = 'right';
                    this.p.vx = 100;
                    this.p.sheet = 'space_pirate_walk_right';
                }

                if(this.p.x >= this.p.stop_right && this.p.vx > 0) {
                    this.trigger('turn_left');
                }
                else if (this.p.x <= this.p.stop_left && this.p.vx < 0) {
                    this.trigger('turn_right')
                }

            }
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
		var samus = stage.insert(new Q.Samus());
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
		stage.insert(new Q.Ball());
		stage.insert(new Q.Missile());

		//var zoomer = stage.insert(new Q.Zoomer({x: 3300, y: 920}));
        //var skree = stage.insert(new Q.Skree({x: 3300, y: 920}));
        var space_pirate = stage.insert(new Q.SpacePirate({ x: 2500, y: 1000, array: 0, stop_right: 1760, stop_left: 1550 }));

		stage.add('viewport').follow(samus);
		stage.viewport.scale = 1;
		stage.viewport.offsetY = 80;
		//stage.add('viewport').follow(mario, { x: true, y: true });
	});

	Q.loadTMX(
		'samus.png, samus.json, weapons.png, weapons.json, rightdoor.png, rightdoor.json, leftdoor.png, leftdoor.json, ball.png, ball.json, missile.png, missile.json, zoomer.png, zoomer.json, skree.png, skree.json, space_pirate.png, space_pirate.json, space_pirate_projectile.png, space_pirate_projectile.json, zebes.tmx',
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
			Q.stageScene('level1');
		}
	);
});
