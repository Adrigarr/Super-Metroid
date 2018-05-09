function loadGoomba(Q) {
    
    Q.animations('goomba animation', {
        'live': { frames: [0, 1], rate: 1 / 5 },
        'die': { frames: [2], loop: false }
    });
    /**
     * Clase que representa al enemigo Goomba.
     */
    Q.Sprite.extend('Goomba', {
        init: function(p) {
            this._super(p, {
                sprite: 'goomba animation',
                /**
                 * Sprite del Goomba.
                 */
                sheet: 'goomba',
                /**
                 * Posición inicial del Goomba.
                 */
                x: 1660,
                y: 500,
                /**
                 * Parámetros de velocidad del Goomba.
                 */
                speed: 170,
                vx: 100,
                /**
                 * Atributos adicionales.
                 */
                die: false,
                collision: false
            });
            /**
             * Los módulos Quintus necesarios.
             */
            this.add('aiBounce, defaultEnemy');
            /**
             * Definición de las funciones adicionales.
             */
            this.on('die');
        },
        /**
         * Muere el Goomba.
         */
        die: function() {
            this.p.die = true;
            this.p.speed = 0;
            this.p.vx = 0;

            setTimeout(function() {
                Q('Goomba').destroy();
            }, 200);
        },
        /**
         * Ejecuta un paso de Goomba.
         */
        step: function(dt) {
            if (this.p.die) {
                this.play('die');
            } else {
                this.play('live');
                /**
                 * En caso de caerse del escenario, Goomba muere.
                 */
                if (this.p.y > fondo_escenario) {
                    this.trigger('die');
                }
            }
        }
    });
}