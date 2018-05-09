function loadCoin(Q) {
    
    Q.animations('coin animation', {
        'live': { frames: [0, 1, 2], rate: 1 / 3 }
    });
    /**
     * Clase que representa a una moneda.
     */
    Q.Sprite.extend('Coin', {
        init: function(p) {
            this._super(p, {
                sprite: 'coin animation',
                /**
                 * Sprite de la moneda.
                 */
                sheet: 'coin',
                /**
                 * Activamos el sensor de la moneda.
                 */
                sensor: true,

                get: false
            });
            this.add('animation, tween');

            this.on('sensor');
        },

        sensor: function() {
            var get = function() {
                this.destroy()
            }
            this.animate({ y: this.p.y - 50 }, 0.3, { callback: get });
            if (!this.p.get) {
                this.p.get = true;
                Q.state.inc('coins', 1);
                Q.audio.play('coin.mp3');
            }
        },

        step: function(dt) {
            this.play('live');
        }
    });
}