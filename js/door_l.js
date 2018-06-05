function loadDoorL(Q) {

	Q.Sprite.extend('DoorL', {
		init: function (p) {
			this._super(p, {
				sprite: 'doors',
				sheet: 'leftdoor',
				lock: false
			});
			this.add('animation, tween');
			this.on('endAnimation', function () {
				this.p.frame = 0;
				Q('Samus').trigger('tpR');
				// Si se trata de la puerta de acceso a la sala de guardado, se guarda en state los datos de interes
				if (
					Q('Samus').items[0].p.x >= 3246 &&
					Q('Samus').items[0].p.x <= 3260 &&
					Q('Samus').items[0].p.y >= 1530 &&
					Q('Samus').items[0].p.y <= 1532
				) {
					console.log("hola");
					Q.state.set({
						save_game: true
					});
					Q.state.set({
						hasMissile:Q('Samus').items[0].missile
					});
				}
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					this.play('open');


				}
			});
		}
	});
	
}