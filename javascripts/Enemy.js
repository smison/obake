
phina.define('GhostEffect', {
  superClass: 'CircleShape',

  init: function() {
    this.superInit({
      stroke: 'rgba(0, 0, 0, 0.2)',
      strokeWidth: 3,
      radius: 1,
      fill: 'rgba(0, 0, 0, 0.4)'
    });
    this.frameCount = 0;
    this.moveFrameInterval = 5;
  },

  update: function() {
    this.radius += 0.1;
    this.frameCount += 1;

    if (this.frameCount == this.moveFrameInterval) {
      this.y -= 3;
      this.frameCount = 0;
    }

    if (this.radius > 5) {
        this.remove();
    }
  }
});

phina.define('Slime', {
  superClass: 'DisplayElement',

  init: function () {
    this.superInit();
    this.sprite = Sprite('slime').addChildTo(this);
    this.sprite.anim = FrameAnimation('slime_ss').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('normal');

    this.alpha = 0.9;
    this.frameCount = 0;
    this.effectFrameInterval = 10;
    this.is_gameover = false;

    this.width = this.sprite.width - 50;
    this.height = this.sprite.height;
  },

  update: function() {
    this.imageUpdate();
    this.frameCount += 1;

    if(this.frameCount == this.effectFrameInterval) {
      this.effect = GhostEffect().addChildTo(this);
      this.effect.x = getRandomArbitary(-1 * this.width / 2, this.width / 2);
      this.effect.y = getRandomArbitary(-1 * this.height / 2, this.height / 2);
      this.frameCount = 0;
    }

    if(!IS_GAMEOVER) {
      this.x -= 4;
    }
  },

  imageUpdate: function() {
    if(IS_GAMEOVER) {
      if(this.is_gameover == false) {
        this.is_gameover = true;
        this.sprite.anim.gotoAndPlay('gameover');
      }
    }
    return true;
  }
});

phina.define('SmallSlime', {
  superClass: 'DisplayElement',

  init: function () {
    this.superInit();
    this.sprite = Sprite('small_slime').addChildTo(this);
    this.sprite.anim = FrameAnimation('small_slime_ss').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('normal');

    this.alpha = 0.9;
    this.frameCount = 0;
    this.effectFrameInterval = 10;
    this.is_gameover = false;

    this.width = this.sprite.width - 20;
    this.height = this.sprite.height;
  },

  update: function() {
    this.imageUpdate();
    this.frameCount += 1;

    if(this.frameCount == this.effectFrameInterval) {
      this.effect = GhostEffect().addChildTo(this);
      this.effect.x = getRandomArbitary(-1 * this.width / 2, this.width / 2);
      this.effect.y = getRandomArbitary(-1 * this.height / 2, this.height / 2);
      this.frameCount = 0;
    }

    if(!IS_GAMEOVER) {
      this.x -= 4;
    }
  },

  imageUpdate: function() {
    if(IS_GAMEOVER) {
      if(this.is_gameover == false) {
        this.is_gameover = true;
        this.sprite.anim.gotoAndPlay('gameover');
      }
    }
    return true;
  }
});

phina.define('Bird', {
  superClass: 'DisplayElement',

  init: function () {
    this.superInit();
    this.sprite = Sprite('bird').addChildTo(this);
    this.sprite.anim = FrameAnimation('bird_ss').attachTo(this.sprite);
    this.sprite.anim.gotoAndPlay('normal');

    this.alpha = 0.9;
    this.frameCount = 0;
    this.effectFrameInterval = 10;
    this.is_gameover = false;
    this.sprite.scale = 0.3;

    this.width = this.sprite.width - 50;
    this.height = this.sprite.height;

    // 待機時間
    this.wait_time = getRandomArbitary(40, 150);

    // 待機位置
    var wait_x = 0;
    var wait_y = 0;
    var position = ['front', 'middle', 'back'].random();

    if(position == 'front') {
        wait_x = SCREEN_WIDTH - 160;
        wait_y = 120;
    } else if(position == 'middle') {
        wait_x = SCREEN_WIDTH - 100;
        wait_y = 120;
    } else {
        wait_x = SCREEN_WIDTH - 50;
        wait_y = 120;
    }

    this.tweener
        .to({
            x: wait_x,
            y: wait_y
        }, 1300, "easeOutExpo");
  },

  update: function() {
    this.imageUpdate();
    this.frameCount += 1;
    this.y += 0;


    if(!IS_GAMEOVER) {
      // 攻撃準備態勢
      if(this.frameCount >= 40 && this.frameCount <= 60) {
        this.x += 1;
        this.y -= 1;
      }
      if(this.frameCount == 50) {
        this.sprite.anim.gotoAndPlay('preattack');
      }

      // 攻撃
      if(this.frameCount >= 60) {
        this.x -= 25;
        this.y += 10;
      }
    }

    if(this.frameCount % this.effectFrameInterval == 0) {
      this.effect = GhostEffect().addChildTo(this);
      this.effect.x = getRandomArbitary(-1 * this.width / 2, this.width / 2);
      this.effect.y = getRandomArbitary(-1 * this.height / 2, this.height / 2);
    }

    if(!IS_GAMEOVER) {
      this.x -= 0;
    }
  },

  imageUpdate: function() {
    if(IS_GAMEOVER) {
      if(this.is_gameover == false) {
        this.is_gameover = true;
        this.sprite.anim.gotoAndPlay('gameover');
      }
    }
    return true;
  }
});
