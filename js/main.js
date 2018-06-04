window.addEventListener('load', function () {
	var Q = (window.Q = Quintus({
			audioSupported: ['mp3', 'ogg']
		})
		.include('Sprites, Scenes, Input, 2D, Anim, UI, TMX, Audio')
		.setup('super-metroid')
		.controls()
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

	loadZoomer(Q);
	loadSkree(Q);
	loadSpacePirateProjectile(Q);
	loadSpacePirate(Q);

	loadKraid(Q);

	loadDiagonal(Q);



	Q.scene('level1', function (stage) {
		Q.stageTMX('zebes.tmx', stage);

		loadDoors(stage);

		Q.state.set({
			save_game: false
		});

		stage.insert(new Q.Ball());
		stage.insert(new Q.Missile());
		var samus = stage.insert(new Q.Samus());
		var zoomer = stage.insert(
			new Q.Zoomer({
				x: 2323,
				y: 1160
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


	Q.loadTMX(
		'samus.png, samus.json, weapons.png, weapons.json, rightdoor.png, rightdoor.json, leftdoor.png, leftdoor.json, ball.png, ball.json, missile.png, missile.json, zoomer.png, zoomer.json, skree.png, skree.json, space_pirate.png, space_pirate.json, space_pirate_projectile.png, space_pirate_projectile.json, kraid.png, kraid.json, zebes.tmx',
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
			Q.stageScene('level1');
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

	// Llamar a este método cuando muera Samus y se quiere cargar partida en vez de reiniciar
	function loadGame() {
		if (Q.state.get('save_game')) {
			Q.clearStages();
			Q.stageScene('load_game');
		}
	}

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
	}
});