phina.define('Player', {
  superClass: 'DisplayElement',

  init: function () {
    this.superInit();
    this.sprite = Sprite('player').addChildTo(this);
    this.sprite.anim = FrameAnimation('player_ss').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('normal');
    this.scaleX *= -1; // 右向きに
    this.is_normal = true;
    this.is_gameover = false;
    this.width = this.sprite.width - 100;
    this.height = this.sprite.height;
  },

  update: function() {
    this.imageUpdate();
  },

  imageUpdate: function() {
    if(IS_GAMEOVER) {
      if(this.is_gameover == false) {
        this.is_gameover = true;
        this.sprite.anim.gotoAndPlay('gameover');
      }
      return true;
    }

    if(!IS_TITLE && IS_CLICK && this.is_normal) {
      this.sprite.anim.gotoAndPlay('closeeye');
      this.is_normal = false;
      return true;
    }

    if(!IS_TITLE && !IS_CLICK && !this.is_normal) {
      this.sprite.anim.gotoAndPlay('normal');
      this.is_normal = true;
    }
    return true;
  }
});
