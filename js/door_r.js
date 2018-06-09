function loadDoorR(Q) {

	Q.Sprite.extend('DoorR', {
		init: function (p) {
			this._super(p, {
				sprite: 'doors',
				sheet: 'rightdoor',
				lock: false
			});
			this.add('animation, tween');
			this.on('endAnimation', function () {
				this.p.frame = 0;
				Q('Samus').trigger('tpL');
				Q.audio.play('close.mp3');
				this.p.lock = false;
			});
			this.on('hit', function (collision) {
				if (collision.obj.isA('Samus')) {
					this.play('open');
					if (!this.p.lock) {
						this.p.lock = true;
						Q.audio.play('open.mp3');
					}
				}
			});
		}
	});

}