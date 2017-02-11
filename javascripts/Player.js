phina.define('Player', {
  superClass: 'Sprite',

  init: function () {
    this.superInit('player');
    this.anim = FrameAnimation('player_ss').attachTo(this);
    this.anim.gotoAndPlay('normal');
    this.scaleX *= -1; // 右向きに
    this.is_normal = true;
    this.is_gameover = false;

    // 衝突判定
    this.collision = RectangleShape().addChildTo(this);
    this.collision.width = this.width;
    this.collision.height = this.height;
    this.collision.alpha = 0; //衝突判定可視化 = 1
  },

  update: function() {
    this.imageUpdate();
  },

  imageUpdate: function() {
    if(IS_GAMEOVER) {
      if(this.is_gameover == false) {
        this.is_gameover = true;
        this.anim.gotoAndPlay('gameover');
      }
      return true;
    }

    if(IS_CLICK && this.is_normal) {
      this.anim.gotoAndPlay('closeeye');
      this.is_normal = false;
      return true;
    }

    if(!IS_CLICK && !this.is_normal) {
      this.anim.gotoAndPlay('normal');
      this.is_normal = true;
    }
    return true;
  }
});
