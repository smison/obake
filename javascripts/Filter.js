phina.define('BloodEffect', {
  superClass: 'CircleShape',

  init: function () {
    this.superInit({
      radius: 30,
      fill: 'rgba(255, 0, 0, 0.5)',
      stroke: 'rgba(255, 0, 0, 0.5)',
      strokeWidth: 2
    });
    this.smallSpeed = getRandomArbitary(1, 10);
    this.xSpeed = getRandomArbitary(-10, 10);
    this.ySpeed = getRandomArbitary(-10, 10);
  },

  update: function() {
    this.radius -= this.smallSpeed;
    this.x -= this.xSpeed;
    this.y -= this.ySpeed;
    if(this.radius <= 0) {
      this.radius = 0;
    }
  }
});

phina.define('BloodFilter', {
  superClass: 'RectangleShape',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'rgba(255, 0, 0, 0.3)',
      stroke: 'rgb(255, 0, 0)',
      strokeWidth: 0,
    });
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
  },

});

phina.define('DarkFilter', {
  superClass: 'RectangleShape',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'rgba(0, 0, 0, 0)',
      stroke: 'rgb(0, 0, 0)',
      strokeWidth: 0
    });
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
    this.alpha = 0;
  },

  update: function() {
    this.fill = 'rgba(0, 0, 0,' + this.alpha + ')';

    if(IS_GAMEOVER) {
      this.alpha = 0;
      return;
    }

    if(!IS_TITLE && IS_CLICK) {
      this.toDark();
    } else {
      this.toLight();
    }
  },

  toDark: function() {
    this.alpha += 0.05;
    if(this.alpha >= 1) {
      this.alpha = 1;
      return true;
    }
    return true;
  },

  toLight: function() {
    this.alpha -= 0.05;
    if(this.alpha <= 0) {
      this.alpha = 0;
      return true;
    }
    return true;
  }
});
