function loadSavePoint(Q) {

  Q.Sprite.extend('Save', {
    init: function (p) {
      this._super(p, {
        w: 32,
        h: 16,
        lock: false
      });
      this.add('2d');
      this.on('bump.top', function (collision) {
        if (collision.obj.isA('Samus')) {
          if (!this.p.lock) {
            this.p.lock = true;
            Q.audio.stop('zebes.mp3');
            Q.audio.play('save.mp3');
            setTimeout(function () {
              Q.audio.play('zebes.mp3');
              this.p.lock = false;
            }, 4000);
            Q.state.set({
              save_game: true,
              hasMissile: collision.obj.p.missile
            });
          }
        }
      });
    }
  });

}