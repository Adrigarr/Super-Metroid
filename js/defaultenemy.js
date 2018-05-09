function loadDefaultEnemy(Q) {
    Q.component('defaultEnemy', {
        added: function() {
            this.entity.add('2d, animation');

            /**
             * Definición de las funciones adicionales.
             */
            this.entity.on('bump.top', this, 'top');
            this.entity.on('bump.left, bump.right, bump.bottom', this, 'collision');
        },
        /**
         * En caso de que Mario salte encima de él, el Bloopa muere.
         */
        top: function(collision) {
            if (collision.obj.isA('Mario')) {
                if(!this.entity.p.collision){
                    this.entity.trigger('die');
                    collision.obj.p.vy = -300;
                    this.entity.p.collision = true;
                }
                
            }
        },
        /**
         * En caso de que Mario choque contra él, Mario muere.
         */
        collision: function(collision) {
            if (collision.obj.isA('Mario')) {
                if(!this.entity.p.collision){
                    collision.obj.trigger('die');
                    this.entity.p.collision = true;
                }
            }
        }
    });
}