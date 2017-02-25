phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: 'rgb(0, 0, 0)',
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
