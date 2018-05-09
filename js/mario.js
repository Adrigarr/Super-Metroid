function loadMario(Q) {
    /*--------------------------------------------MARIO BROS------------------------------------------*/

    Q.animations('mario animation', {
        'run_right': { frames: [1, 2, 3], rate: 1 / 7 },
        'run_left': { frames: [15, 16, 17], rate: 1 / 7 },
        'stand_right': { frames: [0], loop: false },
        'stand_left': { frames: [14], loop: false },
        'jumping_right': { frames: [4], loop: false },
        'jumping_left': { frames: [18], loop: false },
        'die': { frames: [12], loop: false }
    });
    /**
     * Clase que representa a Mario Bros.
     */
    Q.Sprite.extend('Mario', {
        /** 
         * Inicialización de la clase.
         */
        init: function(p) {
            this._super(p, {
                sprite: 'mario animation',
                /**
                 * Sprite de Mario.
                 */
                sheet: 'mario',
                /**
                 * Posición inicial de Mario.
                 */
                x: 150,
                y: 380,
                direction: 'right',
                /**
                 * Parámetros de velocidad de Mario.
                 */
                jumpSpeed: -400,
                speed: 200,
                vy: 10,
                /**
                 * Atributos adicionales.
                 */
                die: false,
                move: true
            });
            /**
             * Los módulos Quintus necesarios.
             */
            this.add('2d, platformerControls, animation, tween');
            /**
             * Definición de las funciones adicionales.
             */
            this.on('die');
            this.on('win');
        },
        /**
         * Mario muere.
         */
        die: function() {
            Q.audio.stop('music_main.mp3');
            if (!this.p.die) {
                Q.audio.play('music_die.mp3');
            }
            this.p.die = true;
            this.p.speed = 0;
            this.p.jumpSpeed = 0;

            var lose = function() {
                this.destroy();
                Q.stageScene('endGame', 1, { label: 'Game Over' });
            }
            var marioDie = function() {
                this.animate({ x: this.p.x, y: fondo_escenario, angle: 0 }, 0.5, { callback: lose });
            }
            this.animate({ y: this.p.y - 100, angle: 0 }, 0.3, { callback: marioDie });
        },
        /**
         * Mario gana.
         */
        win: function() {
            this.p.move = false;
            Q.audio.stop('music_main.mp3');
            Q.audio.play('music_level_complete.mp3');
            Q.stageScene('endGame', 1, { label: 'You Win' });
        },
        /**
         * Ejecuta un paso de Mario.
         */
        step: function(dt) {
            /**
             * En caso de que muera Mario.
             */
            if (this.p.die) {
                this.play('die');
                this.p.speed = 0;
                this.p.jumpSpeed = 0;
            } else {
                /**
                 * Movimiento normal.
                 */
                if (this.p.move) {
                    if (this.p.vy != 0) {
                        this.play('jumping_' + this.p.direction)
                    } else if (this.p.vx > 0) {
                        this.play('run_right');
                    } else if (this.p.vx < 0) {
                        this.play('run_left');
                    } else {
                        this.play('stand_' + this.p.direction);
                    }
                    /*
                     * En caso de caerse del escenario, Mario muere.
                     */
                    if (this.p.y > fondo_escenario) {
                        this.trigger('die');
                    }
                }
                /**
                 * Haya ganado la partida.
                 */
                else {
                    this.play('stand_right');
                    this.p.speed = 0;
                    this.p.jumpSpeed = 0;
                }
            }
        }
    });
}