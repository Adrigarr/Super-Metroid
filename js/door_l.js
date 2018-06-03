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
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					this.play('open');

					// Si se trata de la puerta de acceso a la sala de guardado, se guarda en state los datos de interes
					if (
						collision.obj.p.x >= 3246 &&
						collision.obj.p.x <= 3260 &&
						collision.obj.p.y >= 1530 &&
						collision.obj.p.y <= 1532
					) {
						Q.state.set({
							save_game: true
						});
						Q.state.set({
							hasMissile: collision.obj.missile
						});
					}
				}
			});
		}
	});
	
}