function loadSpacePirate(Q) {
    
    Q.animations('space_pirate animation', {
        'live': { frames: [2, 1, 0, 1], rate: 1 / 1.2 },
        'walkL': {frames: [3, 2, 1, 0, 11, 10, 9, 8], rate: 1 / 2},
        'walkR': {frames: [0, 1, 2, 3, 8, 9, 10, 11], rate: 1 / 2},
        'die': { frames: [2], loop: false }
    });
    /**
     * Clase que representa al enemigo Space_Pirate.
     */
    Q.Sprite.extend('SpacePirate', {
        init: function(p) {
            this._super(p, {
                sprite: 'space_pirate animation',
                /**
                 * Sprite del Space_Pirate.
                 */
                sheet: 'space_pirate_walk_right',
                /**
                 * Posición inicial del Space_Pirate.
                 */
                x: 1660,
                y: 500,
                /**
                 * Parámetros de velocidad del Space_Pirate.
                 */
                speed: 170,
                vx: 100,
                /**
                 * Atributos adicionales.
                 */
                direction: 'right',
                die: false,
                collision: false
            });
            /**
             * Los módulos Quintus necesarios.
             */
            this.add('2d, animation');
            /**
             * Definición de las funciones adicionales.
             */
            this.on('bump.top', this, 'top');
            this.on('bump.left, bump.right, bump.bottom', this, 'collision');
            this.on('bump.left', this, 'turn_right');
            this.on('bump.right', this, 'turn_left');
            this.on('die');
        },
        /**
         * Muere el Space_Pirate.
         */
        die: function() {
            this.p.die = true;
            this.p.speed = 0;
            this.p.vx = 0;

            setTimeout(function() {
                Q('SpacePirate').destroy();
            }, 200);
        },

        /**
         * En caso de que Mario salte encima de él, el Bloopa muere.
         */
        top: function(collision) {
            if (collision.obj.isA('Mario')) {
                if(!this.p.collision){
                    this.trigger('die');
                    collision.obj.p.vy = -300;
                    this.p.collision = true;
                }
                
            }
        },
        /**
         * En caso de que Mario choque contra él, Mario muere.
         */
        collision: function(collision) {
            if (collision.obj.isA('Mario')) {
                if(!this.p.collision){
                    collision.obj.trigger('die');
                    this.p.collision = true;
                }
            }
        },

        turn_left: function() { // WIP
            this.p.direction = 'left';
            
            this.p.vx = -100;
            this.p.sheet = 'space_pirate_walk_left';

            /*this.p.vx = 0;
            this.p.sheet = 'space_pirate_patrol_right';

            setTimeout(function() { // ¿Cómo puedo pasarle el objeto this.p?
                //this.p.vx = -100; //Aquí this.p es undefined
                //this.p.sheet = 'space_pirate_walk_left';
            }, this.play('live'));*/

            
        },

        turn_right: function() { // WIP
            this.p.direction = 'right';
            //this.p.vx = 0;
            //this.p.sheet = 'space_pirate_patrol_right';
            //this.play('live');


            this.p.vx = 100;
            this.p.sheet = 'space_pirate_walk_right';
        },

        /**
         * Ejecuta un paso de Space_Pirate.
         */
        step: function(dt) {
            if (this.p.die) {
                this.play('die');
            } else {
                if (this.p.direction == 'right')
                    this.play('walkR');
                else
                    this.play('walkL');
                /**
                 * En caso de caerse del escenario, Space_Pirate muere.
                 */
                if (this.p.y > fondo_escenario) {
                    this.trigger('die');
                }
            }
        }
    });
}