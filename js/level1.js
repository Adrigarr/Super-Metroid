function loadLevel1(Q) {
    /**
     * Escena que representa el nivel 1.
     */
    Q.scene('level1', function(stage) {
        Q.stageTMX('level.tmx', stage);

        var mario = stage.insert(new Q.Mario());
        var goomba = stage.insert(new Q.Goomba());
        var bloopa = stage.insert(new Q.Bloopa());
        var zoomer = stage.insert(new Q.Zoomer());
        var skree = stage.insert(new Q.Skree());
        //var piranha = stage.insert(new Q.Piranha());
        var princess = stage.insert(new Q.Princess());

        var coin1 = stage.insert(new Q.Coin({ x: 200, y: 450 }));
        var coin2 = stage.insert(new Q.Coin({ x: 230, y: 450 }));
        var coin3 = stage.insert(new Q.Coin({ x: 260, y: 450 }));

        stage.add('viewport').follow(mario, {
            x: true,
            y: true
        }, {
            minY: 120,
            maxY: 500
        });
        Q.stageScene('HUB', 1);
    });
}