function loadEndGame(Q) {
    /**
     * Escena que representa a la pantalla fin de partida.
     */
    Q.scene('endGame', function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: 'rgba(0,0,0,0.5)'
        }));

        var button = container.insert(new Q.UI.Button({
            x: 10,
            y: 10,
            fill: '#CCCCCC',
            label: 'Play Again'
        }));

        button.on('click', function() {
            Q.clearStages();
            Q.stageScene('mainTitle');
        });

        var label = container.insert(new Q.UI.Text({
            x: 10,
            y: -10 - button.p.h,
            label: stage.options.label
        }));

        container.fit(20);
    });
}