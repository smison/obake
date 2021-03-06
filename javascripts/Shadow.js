phina.define('Shadow', {
  superClass: 'DisplayElement',

  init: function () {
    this.superInit();
    this.sprite = Sprite('shadow').addChildTo(this);
    this.sprite.anim = FrameAnimation('shadow_ss').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('normal');
    this.scaleX *= -1; // 右向きに
    this.alpha = 0.7;
    this.is_normal = true;
    this.is_gameover = false;
    this.width = this.sprite.width;
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

    if(IS_CLICK && this.is_normal) {
      this.sprite.anim.gotoAndPlay('closeeye');
      this.is_normal = false;
      return true;
    }

    if(!IS_CLICK && !this.is_normal) {
      this.sprite.anim.gotoAndPlay('normal');
      this.is_normal = true;
    }
    return true;
  }
});
