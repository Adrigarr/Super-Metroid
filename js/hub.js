function loadHUB(Q) {
    Q.UI.Text.extend('CoinsLabel', {
        init: function(p) {
            this._super({
                label: p.label,
                x: 0,
                y: 10,
                size: 16
            });

            Q.state.on('change.coins', this, 'changeCoins');
        },

        changeCoins: function(coins) {
            this.p.label = 'Coins: ' + coins;
        }
    });

    Q.scene('HUB', function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 3,
            y: 0,
            fill: 'rgba(0,0,0,0.0)'
        }));

        var label = container.insert(new Q.CoinsLabel({ label: 'Coins: 0' }));

        container.fit(20);
    });
}