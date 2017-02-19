phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });

  },

  onclick: function() {
    this.exit();
  },

  update: function() {
    // TitleSceneとMainSceneをシームレスにしたいのでスキップ
    this.exit();
  }
});
