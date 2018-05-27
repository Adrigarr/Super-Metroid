function loadLevel1(Q) {
    /**
     * Escena que representa el nivel 1.
     */
    Q.scene('level1', function(stage) {
        Q.stageTMX('level.tmx', stage);

        var mario = stage.insert(new Q.Mario());
        //var goomba = stage.insert(new Q.Goomba());
        var bloopa = stage.insert(new Q.Bloopa());
        //var zoomer = stage.insert(new Q.Zoomer());
        var skree = stage.insert(new Q.Skree());
        var space_pirate = stage.insert(new Q.SpacePirate({ x: 1660, y: 500, array: 0, stop_right: 1760, stop_left: 1550 })); // array indica la posición en el array Q('SpacePirate').items que ocupa este pirata en concreto. 
                                                                                                                            // Es necesario especificarlo para que funcionen algunas funciones
                                                                                                                            // stop_right y stop_left son los puntos del eje x donde debe dar la vuelta el pirata en su patrulla
        //var space_pirate2 = stage.insert(new Q.SpacePirate({ x: 1400, y: 400, array: 1 }));
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
