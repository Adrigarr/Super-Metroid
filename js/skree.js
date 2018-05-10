function loadSkree(Q) {

    Q.animations('skree animation', {
        'live': { frames: [0, 1, 2, 3], rate: 1 / 2 },
        'die': { frames: [4], loop: false }
    });
    /**
     * Clase que representa al enemigo Skree.
     */
    Q.Sprite.extend('Skree', {
        init: function(p) {
            this._super(p, {
                sprite: 'skree animation',
                /**
                 * Sprite del Skree.
                 */
                sheet: 'skree',
                /**
                 * Posición inicial del Skree.
                 */
                x: 1190,
                y: 500,
                /**
                 * Parámetros de velocidad del Skree.
                 */
                 gravityX: 0,
                 gravityY: 10,
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
         * Muere el Skree.
         */
        die: function() {
            this.p.die = true;
            this.p.vy = 70;
            setTimeout(function() {
                Q('Skree').destroy();
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
                 * Indicamos el tiempo al que baja el Skree.
                 */
                if (this.p.time_jump >= 1.5) {
                    this.p.vy = 70;
                }
                /**
                 * En caso de caerse del escenario, Skree muere.
                 */
                if (this.p.y > fondo_escenario) {
                    this.trigger('die');
                }
            }
        }
    });
}