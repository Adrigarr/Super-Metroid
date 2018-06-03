function loadDiagonal(Q) {

	Q.Sprite.extend('Diagonal', {
		init: function (p) {
			this._super(p, {
				w: 16,
				h: 16
			});
			this.add('2d');
			this.on('bump.right, bump.left, bump.top', function (collision) {
				if (collision.obj.isA('Samus')) {
					if (this.p.dx == 'left') {
						if (Q.inputs['left']) {
							collision.obj.p.y -= 2;
							collision.obj.p.x -= 2;
						} else if (Q.inputs['right']) {
							collision.obj.p.y += 2;
						}
					} else if (this.p.dx == 'right') {
						if (Q.inputs['right']) {
							collision.obj.p.y -= 2;
							collision.obj.p.x += 2;
						} else if (Q.inputs['left']) {
							collision.obj.p.y += 2;
						}
					}
				}
			});
		}
	});
	
}