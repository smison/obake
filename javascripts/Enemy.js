phina.define('GhostEffect', {
  superClass: 'CircleShape',

  init: function() {
    this.superInit({
      stroke: 'rgba(0, 0, 0, 0.2)',
      strokeWidth: 3,
      radius: 1,
      fill: 'rgba(0, 0, 0, 0.4)'
    });
    this.frameCount = 0;
    this.moveFrameInterval = 5;
  },

  update: function() {
    this.radius += 0.1;
    this.frameCount += 1;

    if (this.frameCount == this.moveFrameInterval) {
      this.y -= 3;
      this.frameCount = 0;
    }

    if (this.radius > 5) {
        this.remove();
    }
  }
});

phina.define('Enemy', {
  superClass: 'Sprite',

  init: function () {
    this.superInit('slime');
    this.anim = FrameAnimation('slime_ss').attachTo(this);
    this.anim.gotoAndPlay('normal');
    this.alpha = 0.8;
    this.frameCount = 0;
    this.effectFrameInterval = 10;
    this.is_gameover = false;

    // 衝突判定
    this.collision = RectangleShape().addChildTo(this);
    this.collision.width = this.width;
    this.collision.height = this.height;
    this.collision.alpha = 0; //衝突判定可視化 = 1
  },

  update: function() {
    this.imageUpdate();
    this.frameCount += 1;

    if(this.frameCount == this.effectFrameInterval) {
      this.effect = GhostEffect().addChildTo(this);
      this.effect.x = getRandomArbitary(-1 * this.width / 2, this.width / 2);
      this.effect.y = getRandomArbitary(-1 * this.height / 2, this.height / 2);
      this.frameCount = 0;
    }

    if(!IS_GAMEOVER) {
      this.x -= 5;
    }
  },

  imageUpdate: function() {
    if(IS_GAMEOVER) {
      if(this.is_gameover == false) {
        this.is_gameover = true;
        this.anim.gotoAndPlay('gameover');
      }
    }
    return true;
  }
});
