function loadPrincessPeach(Q) {

    /**
     * Clase que representa a la Princesa Peach.
     */
    Q.Sprite.extend('Princess', {
        init: function(p) {
            this._super(p, {
                /**
                 * Imagen de Peach.
                 */
                asset: 'princess.png',
                /**
                 * Posición inicial de Peach.
                 */
                x: 2000,
                y: 452,
                /**
                 * Activamos el sensor de Peach.
                 */
                sensor: true
            });
            /**
             * Necesario para implementar el sensor.
             */
            this.on('sensor');
        },
        /**
         * Sensor de la princesa Peach.
         */
        sensor: function() {
            this.p.sensor = false;
            Q('Mario').trigger('win');
        }
    });
}