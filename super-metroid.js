window.addEventListener('load', function () {
	var Q = (window.Q = Quintus({
			audioSupported: ['mp3', 'ogg']
		})
		.include('Sprites, Scenes, Input, 2D, Anim, UI, TMX, Audio')
		.setup({
			width: 400, // Set the default width to 800 pixels
			height: 300 // Set the default height to 600 pixels
		})
		.controls()
		.enableSound());

	Q.Sprite.extend('Mario', {
		init: function (p) {
			this._super(p, {
				sheet: 'marioR',
				x: 3320, //3075, 1540, 3220
				y: 900, //300, 480, 900
				ball: false,
				missile: false,
				onAir: false
			});
			this.add('2d, platformerControls');
			this.on('bump.bottom', this, 'floor');
			Q.input.on('up', this, 'jump');
		},
		step: function (dt) {
			console.log(this.p.x);
			console.log(this.p.y);
			// console.log(this.onAir);
		},
		jump: function () {
			if (!this.onAir) {
				this.p.y -= 50;
				this.onAir = true;
			}
		},
		floor: function () {
			this.onAir = false;
		}
	});

	Q.Sprite.extend('DoorR', {
		init: function (p) {
			this._super(p, {
				sheet: 'rightdoor'
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Mario')) {
					collision.obj.p.x -= 290;
				}
			});
		}
	});

	Q.Sprite.extend('DoorL', {
		init: function (p) {
			this._super(p, {
				sheet: 'leftdoor'
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Mario')) {
					collision.obj.p.x += 290;
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
				if (collision.obj.isA('Mario')) {
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
				if (collision.obj.isA('Mario')) {
					collision.obj.p.missile = true;
					this.destroy();
				}
			});
			this.add('animation, tween');
			this.play("shine");
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
		var mario = stage.insert(new Q.Mario());
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
		stage.add('viewport').follow(mario);
		stage.viewport.scale = 1;
		stage.viewport.offsetY = 80;
		//stage.add('viewport').follow(mario, { x: true, y: true });
	});

	Q.loadTMX(
		'mario_small.png, mario_small.json, rightdoor.png, rightdoor.json, leftdoor.png, leftdoor.json, ball.png, ball.json, missile.png, missile.json, zebes.tmx',
		function () {
			Q.compileSheets('mario_small.png', 'mario_small.json');
			Q.compileSheets('rightdoor.png', 'rightdoor.json');
			Q.compileSheets('leftdoor.png', 'leftdoor.json');
			Q.compileSheets('ball.png', 'ball.json');
			Q.compileSheets('missile.png', 'missile.json');
			Q.stageScene('level1');
		}
	);
});