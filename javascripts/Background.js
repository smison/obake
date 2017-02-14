phina.define('Background', {
  superClass: 'DisplayElement',

  init: function () {
    this.superInit();
    this.sprite = Sprite('background').addChildTo(this);
  },

  update: function() {
    if(!IS_GAMEOVER) {
      this.x -= 1;
    }
  }
});
