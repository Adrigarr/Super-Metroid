function loadSpacePirateProjectile(Q) {
    
    Q.animations('space_pirate_projectile animation', {
        'fire': { frames: [0, 1], rate: 1 / 2 }
    });


   Q.Sprite.extend("SpacePirateProjectile", {
        init: function (p) {
            this._super(p, {

                sprite: 'space_pirate_projectile animation',
                sheet: 'space_pirate_projectile',
                vy: 0,
                gravity: false,

            });

            this.add('2d, animation');
            this.on("hit", function (collision) {
                this.destroy();
            });
        }
    });
}