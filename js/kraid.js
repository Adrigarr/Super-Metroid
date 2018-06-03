function loadKraid(Q) {

	Q.animations('kraid animation', {
		// WIPS
		live: {
			frames: [0],
			loop: false
		}
	});
	/**
	 * Clase que representa al enemigo Skree.
	 */
	Q.Sprite.extend('Kraid', {
		init: function (p) {
			this._super(p, {
				sprite: 'kraid animation',
				/**
				 * Sprite del Skree.
				 */
				sheet: 'kraid'
			});
			/**
			 * Los módulos Quintus necesarios.
			 */
			this.add('2d, animation');
		},

		step: function (dt) {
			this.play('live');
		}
	});
}