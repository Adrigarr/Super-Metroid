function loadSpikes(Q) {

	Q.animations('spikes animation', {
	        'live': { frames: [0], loop: false }
	    });


	Q.Sprite.extend('Spikes', {
	    init: function (p) {
	        this._super(p, {
	            sprite: 'spikes animation',
	            sheet: 'spikes',
				vx: 0,
	            vy: 0,
	            cd: 70,
				damage: 1
	        });

	        this.add('2d, animation');

	        this.on('bump.top', this, 'hit');
	    },

	    hit: function(collision) {
	    	if(collision.obj.isA("Samus") && this.p.cd == 60) {
	    		this.p.cd = 0;
				collision.obj.checkLives(this.p.damage);
			}
			else
				this.p.cd++;
	    },

	    step: function(dt) {
	        this.play('live');
	    }

	});

}