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