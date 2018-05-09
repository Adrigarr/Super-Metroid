function loadBloopa(Q) {

    Q.animations('bloopa animation', {
        'live': { frames: [0, 1], rate: 1 / 2 },
        'die': { frames: [2], loop: false }
    });
    /**
     * Clase que representa al enemigo Bloopa.
     */
    Q.Sprite.extend('Bloopa', {
        init: function(p) {
            this._super(p, {
                sprite: 'bloopa animation',
                /**
                 * Sprite del Bloopa.
                 */
                sheet: 'bloopa',
                /**
                 * Posición inicial del Bloopa.
                 */
                x: 1190,
                y: 500,
                /**
                 * Parámetros de velocidad del Bloopa.
                 */
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
            this.add('defaultEnemy');
            /**
             * Definición de las funciones adicionales.
             */
            this.on('die');
        },
        /**
         * Muere el Bloopa.
         */
        die: function() {
            this.p.die = true;
            this.p.vy = 70;
            setTimeout(function() {
                Q('Bloopa').destroy();
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
                if (this.p.vy == 0) {
                    this.p.vy = -70;
                    this.p.time_jump = 0;
                }
                /**
                 * Indicamos el tiempo al que baja el Boolpa.
                 */
                if (this.p.time_jump >= 1.5) {
                    this.p.vy = 70;
                }
                /**
                 * En caso de caerse del escenario, Bloopa muere.
                 */
                if (this.p.y > fondo_escenario) {
                    this.trigger('die');
                }
            }
        }
    });
}