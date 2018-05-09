function loadPiranha(Q) {

    Q.animations('piranha animation', {
        'live': { frames: [0, 1], rate: 1 / 2 },
        'die': {frames: [2, 3], loop: false}
    });
    /**
     * Clase que representa al enemigo Piranha.
     */
    Q.Sprite.extend('Piranha', {
        init: function(p) {
            this._super(p, {
                sprite: 'piranha animation',
                /**
                 * Sprite de la Piranha.
                 */
                sheet: 'piranha',
                /**
                 * Posición inicial de la Piranha.
                 */
                x: 275,
                y: 520,
                gravity: 0,

                /**
                 * Atributos adicionales.
                 */
                time_jump: 0,
                die: false,
                collision: false
            });
            /**
             * Los módulos Quintus necesarios.
             */
            this.add('animation');
            /**
             * Definición de las funciones adicionales.
             */
            this.on('die');
        },
        /**
         * Muere el Piranha.
         */
        die: function() {
            this.p.die = true;
            this.p.vy = 30;
            setTimeout(function() {
                Q('Piranha').destroy();
            }, 200);
        },

        step: function(dt) {
            if (this.p.die) {
                this.play('die');
            } else {
                this.play('live');
                this.p.time_jump += dt;


                /**
                 * Si toca está en el suelo, salta.
                 */
                if (this.p.y == 568) {
                    this.p.vy = -30;
                    this.p.time_jump = 0;
                }
                /**
                 * Indicamos el tiempo al que baja el Boolpa.
                 */
                if (this.p.time_jump >= 1) {
                    this.p.vy = 30;
                }
            }
        }
    });
}