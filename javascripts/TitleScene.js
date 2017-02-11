phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });

    // タイトル
    this.label = Label(TITLE).addChildTo(this);
    this.label.x = this.gridX.span(11) + 15;
    this.label.y = this.gridY.span(2);
  },

  onclick: function() {
    this.exit();
  },

  update: function() {
    // TODO: removeMe
    this.exit();
  }
});
