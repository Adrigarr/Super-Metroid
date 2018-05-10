function loadZoomer(Q) {
    
    Q.animations('zoomer animation', {
        'live': { frames: [0, 1, 2], rate: 1 / 2 },
        'die': { frames: [4], loop: false }
    });
    /**
     * Clase que representa al enemigo Zoomer.
     */
    Q.Sprite.extend('Zoomer', {
        init: function(p) {
            this._super(p, {
                sprite: 'zoomer animation',
                /**
                 * Sprite del Zoomer.
                 */
                sheet: 'zoomer',
                /**
                 * Posición inicial del Zoomer.
                 */
                x: 1660,
                y: 500,
                /**
                 * Parámetros de velocidad del Zoomer.
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
         * Muere el Zoomer.
         */
        die: function() {
            this.p.die = true;
            this.p.speed = 0;
            this.p.vx = 0;

            setTimeout(function() {
                Q('Zoomer').destroy();
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
                 * En caso de caerse del escenario, Zoomer muere.
                 */
                if (this.p.y > fondo_escenario) {
                    this.trigger('die');
                }
            }
        }
    });
}