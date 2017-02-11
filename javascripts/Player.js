phina.define('Player', {
  superClass: 'Sprite',

  init: function () {
    this.superInit('player');
    this.anim = FrameAnimation('player_ss').attachTo(this);
    this.anim.gotoAndPlay('normal');
    this.scaleX *= -1; // 右向きに
    this.is_normal = true;
    this.is_dead = false;
  },

  update: function() {
    this.imageUpdate();
  },

  imageUpdate: function() {
    if(IS_DEAD) {
      if(this.is_dead == false) {
        this.is_dead = true;
        this.anim.gotoAndPlay('dead');
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
