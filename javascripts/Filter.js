phina.define('BloodFilter', {
  superClass: 'RectangleShape',

  init: function () {
    this.superInit({
      stroke: false,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'rgba(255, 0, 0, 0.3)',
      stroke: 'rgb(255, 0, 0)',
      strokeWidth: 0,
    });
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
  }
});

phina.define('DarkFilter', {
  superClass: 'RectangleShape',

  init: function () {
    this.superInit({
      stroke: false,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'rgba(0, 0, 0, 0)',
      stroke: 'rgb(0, 0, 0)',
      strokeWidth: 0,
    });
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
    this.alpha = 0;
  },

  update: function() {
    this.fill = 'rgba(0, 0, 0,' + this.alpha + ')'

    if(IS_DEAD) {
      this.alpha = 0;
      return;
    }

    if(IS_CLICK) {
      if(this.alpha < 1) {
        this.alpha += 0.05;
      } else {
        this.alpha = 1;
      }
    }else{
      if(this.alpha > 0) {
        this.alpha -= 0.05;
      } else {
        this.alpha = 0;
      }
    }
  }
});
