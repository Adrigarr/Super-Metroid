window.addEventListener('load', function() {
	var Q = (window.Q = Quintus({ audioSupported: ['mp3', 'ogg'] })
		.include('Sprites, Scenes, Input, 2D, Anim, UI, TMX, Audio')
		.setup({
			width: 800, // Set the default width to 800 pixels
			height: 600 // Set the default height to 600 pixels
			//scaleToFit: true // Scale the game to fit the screen of the player's device
		})
		.controls()
		.enableSound());

	Q.scene('level1', function(stage) {
		Q.stageTMX('level.tmx', stage);
		// Inicializa el score a 0
		Q.state.set({ score: 0 });
		var mario = stage.insert(new Q.Mario());

		stage.add('viewport').follow(mario);
		stage.add('viewport').follow(mario, { x: true, y: false });
	});

	Q.scene('endGame', function(stage) {
		var container = stage.insert(
			new Q.UI.Container({
				x: Q.width / 2,
				y: Q.height / 2,
				fill: 'rgba(0,0,0,0.5)'
			})
		);

		var button = container.insert(
			new Q.UI.Button({
				x: 0,
				y: 0,
				fill: '#CCCCCC',
				label: 'Jugar de nuevo',
				keyActionName: 'confirm'
			})
		);
		var label = container.insert(
			new Q.UI.Text({ x: 10, y: -10 - button.p.h, label: stage.options.label })
		);
		button.on('click', function() {
			Q.clearStages();
			Q.stageScene('level1');
			Q.stageScene('hud', 3, Q('Mario').first().p);
			Q.audio.stop();
			Q.audio.play('music_main.mp3', { loop: true });
		});
		container.fit(20);
	});

	Q.scene('mainMenu', function(stage) {
		var container = stage.insert(
			new Q.UI.Container({
				x: Q.width / 2,
				y: Q.height / 2,
				fill: 'rgba(0,0,0,0.5)'
			})
		);

		var button = container.insert(
			new Q.UI.Button({
				asset: 'start.jpg',
				x: 0,
				y: 0,
				fill: '#CCCCCC',
				keyActionName: 'confirm'
			})
		);
		button.on('click', function() {
			Q.clearStages();
			Q.stageScene('level1');
			Q.stageScene('hud', 3, Q('Mario').first().p);
			Q.audio.play('music_main.mp3', { loop: true });
		});
	});

	Q.scene('hud', function(stage) {
		var container = stage.insert(
			new Q.UI.Container({
				x: -80,
				y: -20
			})
		);

		var label = container.insert(
			new Q.UI.Text({
				x: 200,
				y: 20,
				label: 'Score: ' + Q.state.get('score'),
				color: 'black'
			})
		);
		container.fit(16);
	});

	Q.loadTMX(
		'mario_small.png, mario_small.json, goomba.png, goomba.json, bloopa.png, bloopa.json, princess.png, start.jpg, coin.png, coin.json, coin.mp3, music_main.mp3, music_die.mp3, music_level_complete.mp3, level.tmx',
		function() {
			Q.compileSheets('mario_small.png', 'mario_small.json');
			Q.compileSheets('goomba.png', 'goomba.json');
			Q.compileSheets('bloopa.png', 'bloopa.json');
			Q.compileSheets('princess.png');
			Q.compileSheets('start.jpg');
			Q.compileSheets('coin.png', 'coin.json');
			Q.stageScene('mainMenu');
		}
	);

	Q.animations('mario_anim', {
		run_right: { frames: [1, 2, 3], rate: 1 / 10 },
		run_left: { frames: [15, 16, 17], rate: 1 / 10 },
		jump_right: { frames: [4], next: 'stand_right', rate: 1 / 3, trigger: 'jump' },
		jump_left: { frames: [18], next: 'stand_left', rate: 1 / 3, trigger: 'jump' },
		stand_right: { frames: [0], rate: 1 / 5 },
		stand_left: { frames: [14], rate: 1 / 5 },
		fall_right: { frames: [2], loop: false },
		fall_left: { frames: [14], loop: false },
		dead: { frames: [12], rate: 1 / 3, loop: false, trigger: 'destroy' }
	});

	Q.Sprite.extend('Mario', {
		init: function(p) {
			this._super(p, {
				sprite: 'mario_anim',
				sheet: 'marioR',
				x: 100,
				y: 528,
				frame: 0
			});

			this.add('2d, platformerControls, animation');

			// Trigger de la animacion al morir
			this.on('destroy', function() {
				Q.stageScene('endGame', 1, { label: 'Has muerto!' });
				this.destroy();
			});
		},
		step: function(dt) {
			// Mario cae hacia abajo
			if (this.p.y > 620) {
				this.p.y = 400;
				this.p.x = 150;
			}

			if (this.p.vy != 0 && this.p.vx > 0) {
				this.play('jump_right');
				this.ultimo = 0;
			} else if (this.p.vy != 0 && this.p.vx < 0) {
				this.play('jump_left');
				this.ultimo = 1;
			} else if (this.p.vx > 0) {
				this.play('run_right');
				this.ultimo = 0;
			} else if (this.p.vx < 0) {
				this.play('run_left');
				this.ultimo = 1;
			} else if (this.ultimo == 0) {
				this.play('stand_right');
			} else if (this.ultimo == 1) {
				this.play('stand_left');
			} else {
				this.play('stand_right');
			}
		}
	});
});
