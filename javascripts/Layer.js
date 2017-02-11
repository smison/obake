
phina.define("Layer", {
  superClass: "phina.display.Layer",
  _cameraOffsetX: 0,
  renderChildBySelf: false, // falseのとき子要素を自分で描画する
  skip: false,

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.setOrigin(0, 0);
  }
});
