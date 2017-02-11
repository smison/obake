phina.define('Enemy', {
  superClass: 'RectangleShape',

  init: function () {
    this.superInit({
      stroke: false,
      width: 200,
      height: 200,
      fill: 'rgb(200, 128, 22)',
      stroke: 'black',
      strokeWidth: 2,
    });
    this.x = 0;
    this.y = 0;
  },

  update: function() {
    if(!IS_DEAD) {
      this.x -= 1;
    }
  },
});
