window.addEventListener('load', function () {
	var Q = (window.Q = Quintus({
			audioSupported: ['mp3', 'ogg']
		})
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
		.setup('super-metroid')
		.controls()
		.touch()
		.enableSound());

	Q.animations('doors', {
		open: {
			frames: [2, 4, 6, 7, 7],
			rate: 1 / 5,
			loop: false,
			trigger: 'endAnimation'
		},
		close: {
			frames: [7, 6, 4, 2, 0],
			rate: 1 / 5,
			loop: false,
			trigger: 'endAnimation'
		}
	});

	Q.animations('shine', {
		shine: {
			frames: [0, 1],
			rate: 1 / 5
		}
	});

	loadSamus(Q);
	loadMunition(Q);
	loadBall(Q);
	loadMissile(Q);

	loadDoorR(Q);
	loadDoorL(Q);

	loadSavePoint(Q);

	loadZoomer(Q);
	loadSkree(Q);
	loadSpacePirateProjectile(Q);
	loadSpacePirate(Q);

	loadKraid(Q);
	loadKraidBullet(Q);

	loadDiagonal(Q);

	Q.scene('level1', function (stage) {
		Q.stageTMX('zebes.tmx', stage);

		Q.audio.stop('kraid-battle.mp3')
		Q.audio.stop('zebes.mp3');
		Q.audio.play('zebes.mp3', {
			loop: true
		});

		loadDoors(stage);

		Q.state.set({
			save_game: false
		});

		stage.insert(new Q.Ball());
		stage.insert(new Q.Missile());
		var samus = stage.insert(new Q.Samus());


		var zoomer1 = stage.insert(
			new Q.Zoomer({
				x: 2323,
				y: 1160
			})
		);

		var zoomer2 = stage.insert(
			new Q.Zoomer({
				x: 1836,
				y: 906,
				sprite: 'zoomer_wall_left animation',
				sheet: 'zoomer_wall',
				vx: 0,
				vy: 50,
				gravityY: 0,
				gravityX: -100,
				wall: true
			})
		);

		var zoomer3 = stage.insert(
			new Q.Zoomer({
				x: 2132,
				y: 906,
				sprite: 'zoomer_wall_right animation',
				sheet: 'zoomer_wall',
				vx: 0,
				vy: 50,
				gravityY: 0,
				gravityX: 100,
				wall: true
			})
		);

		var skree = stage.insert(
			new Q.Skree({
				x: 2144,
				y: 334
			})
		);
		var space_pirate = stage.insert(
			new Q.SpacePirate({
				x: 1700,
				y: 1672,
				array: 0,
				stop_right: 1760,
				stop_left: 1675
			})
		);
		var kraid = stage.insert(
			new Q.Kraid({
				x: 438,
				y: 1648
			})
		);

		stage.add('viewport').follow(samus);
		stage.viewport.scale = 1;
		stage.viewport.offsetY = 80;
	});

	Q.scene('mainMenu', function (stage) {
		var container = stage.insert(new Q.UI.Container({
			x: Q.width / 2,
			y: Q.height / 2,
			fill: "rgba(0,0,0,0.5)"
		}));

		var button = container.insert(new Q.UI.Button({
			asset: "start2.png",
			x: 0,
			y: 0,
			fill: "#CCCCCC",
			keyActionName: "confirm"
		}));

		Q.audio.play('title.mp3');

		button.on("click", function () {
			Q.audio.stop('title.mp3');
			Q.clearStages();
			Q.stageScene('level1');
		});
	});


	Q.scene('endGame', function (stage) {
		var container = stage.insert(new Q.UI.Container({
			x: Q.width / 2,
			y: Q.height / 2.25,
			fill: "#666666"
		}));

		var reset = container.insert(new Q.UI.Button({
			x: 10,
			y: 0,
			fill: "#CCCCCC",
			label: "Reiniciar",
			keyActionName: "confirm"
		}));

		reset.on("click", function () {
			Q.clearStages();
			Q.stageScene('level1');
		});

		if (Q.state.get('save_game')) {
			var load = container.insert(new Q.UI.Button({
				x: 10,
				y: 70,
				fill: "#CCCCCC",
				label: "Cargar",
				keyActionName: "confirm"
			}));
			load.on("click", function () {
				Q.clearStages();
				Q.stageScene('load_game');
			});
		}
		var label = container.insert(new Q.UI.Text({
			x: 10,
			y: -20 - reset.p.h,
			color: "white",
			label: stage.options.label
		}));
		container.fit(20);
	});

	Q.loadTMX(
		'start2.png, samus.png, samus.json, weapons.png, weapons.json, rightdoor.png, rightdoor.json, leftdoor.png, leftdoor.json, ball.png, ball.json, missile.png, missile.json, zoomer.png, zoomer.json, zoomer_wall.png, zoomer_wall.json, skree.png, skree.json, space_pirate.png, space_pirate.json, space_pirate_projectile.png, space_pirate_projectile.json, kraid.png, kraid.json, kraid_bullets.png, kraid_bullets.json, kraid_claws.png, kraid_claws.json, zebes.tmx, zebes.mp3, shoot.mp3, open.mp3, close.mp3, jump.mp3, powerup.mp3, kraid-battle.mp3, missile.mp3, skree.mp3, space-pirate-proyectile.mp3, damage.mp3, save.mp3, title.mp3',
		function () {
			Q.compileSheets('start2.png');
			Q.compileSheets('samus.png', 'samus.json');
			Q.compileSheets('weapons.png', 'weapons.json');
			Q.compileSheets('rightdoor.png', 'rightdoor.json');
			Q.compileSheets('leftdoor.png', 'leftdoor.json');
			Q.compileSheets('ball.png', 'ball.json');
			Q.compileSheets('missile.png', 'missile.json');
			Q.compileSheets('zoomer.png', 'zoomer.json');
			Q.compileSheets('zoomer_wall.png', 'zoomer_wall.json');
			Q.compileSheets('skree.png', 'skree.json');
			Q.compileSheets('space_pirate.png', 'space_pirate.json');
			Q.compileSheets('space_pirate_projectile.png', 'space_pirate_projectile.json');
			Q.compileSheets('kraid.png', 'kraid.json');
			Q.compileSheets('kraid_bullets.png', 'kraid_bullets.json');
			Q.compileSheets('kraid_claws.png', 'kraid_claws.json');
			Q.stageScene("mainMenu");
		}
	);

	// Esta escena carga la partida desde la sala de guardado cuando Samus muere
	Q.scene('load_game', function (stage) {
		Q.stageTMX('zebes.tmx', stage);
		loadDoors(stage);
		var samus = stage.insert(
			new Q.Samus({
				misille: Q.state.get('hasMissile'),
				ball: true,
				x: 3402.525,
				y: 1547.6
			})
		);
		var space_pirate = stage.insert(
			new Q.SpacePirate({
				x: 1700,
				y: 1672,
				array: 0,
				stop_right: 1760,
				stop_left: 1675
			})
		);
		var kraid = stage.insert(
			new Q.Kraid({
				x: 438,
				y: 1648
			})
		);
		stage.add('viewport').follow(samus);
		stage.viewport.scale = 1;
		stage.viewport.offsetY = 80;
	});

	function loadDoors(stage) {
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
	}
});