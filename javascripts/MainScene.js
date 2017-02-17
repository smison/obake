
phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });
    this.score = 0;
    this.frameCount = 0;
    this.scoreUpFrameInterval = 30;

    this.backgroundLayer = Layer().addChildTo(this);
    this.enemyLayer = Layer().addChildTo(this);
    this.darkFilterLayer = Layer().addChildTo(this);
    this.playerLayer = Layer().addChildTo(this);
    this.booldFilterLayer = Layer().addChildTo(this);

    this.enemyPopFrameCount = 0;
    this.enemyPopInterval = 200;

    this.enemyGroup = [];

    // 背景配置(スクロール時に見切れないよう画面3枚分)
    this.backgrounds = [];
    for(var i=0; i <= 2; i++) {
      var background = Background().addChildTo(this.backgroundLayer);
      background.x = this.gridX.center() + SCREEN_WIDTH * i;
      background.y = this.gridY.center();
      this.backgrounds.push(background);
    }

    // 影配置
    this.shadow = Shadow().addChildTo(this.darkFilterLayer);
    this.shadow.x = this.gridX.center(-5);
    this.shadow.bottom = this.gridY.center(7.7);

    // プレイヤー配置
    this.player = Player().addChildTo(this.playerLayer);
    this.player.x = this.gridX.center(-4.5);
    this.player.bottom = this.gridY.center(8);

    // スコアラベル
    this.label = Label(this.score).addChildTo(this.playerLayer);
    this.label.fill = 'white';
    this.label.x = this.gridX.span(12);
    this.label.y = this.gridY.span(2);

    // 闇
    this.darkFilter = DarkFilter().addChildTo(this.darkFilterLayer);
  },

  update: function () {
    this.scoreUpdate();

    this.label.text = this.score;

    // 一番左側の背景が十分画面外に来たら、一番右に背景を足して一番左の背景を削除
    if(this.backgrounds[0].x < -SCREEN_WIDTH) {
      var newBackground = Background().addChildTo(this.backgroundLayer);
      newBackground.x = this.backgrounds[2].x + SCREEN_WIDTH;
      newBackground.y = this.gridY.center();
      this.backgrounds.push(newBackground);
      var oldBackground = this.backgrounds.shift();
      oldBackground.remove();
    }

    // 難易度調整
    if(this.score < 500) {
      this.enemyPopInterval = 200;
    } else if(this.score < 1000) {
      this.enemyPopInterval = 100;
    } else if(this.score < 1500) {
      this.enemyPopInterval = 50;
    } else {
      this.enemyPopInterval = 10;
    }

    // 敵出現
    this.enemyPopFrameCount += 1;
    if(!IS_GAMEOVER &&
      (this.enemyPopFrameCount >= this.enemyPopInterval)) {
      var enemyType = getRandomInt(0, 1);

      if(enemyType == 0) {
        // 大スライム配置
        var enemy = Enemy().addChildTo(this.enemyLayer);
        enemy.x = this.gridX.center(5);
        enemy.bottom = this.gridY.center(8);
        this.enemyGroup.push(enemy);
      } else if (enemyType == 1) {
        // 鳥配置
        var enemy = Bird().addChildTo(this.enemyLayer);
        enemy.x = this.gridX.center(5);
        enemy.bottom = this.gridY.center(1);
        this.enemyGroup.push(enemy);
      }
      this.enemyPopFrameCount = 0;
    }

    // 衝突判定
    var is_hit = false;
    for(var i=0; i < this.enemyGroup.length; i++) {
      if(this.player.hitTestElement(this.enemyGroup[i])) {
        is_hit = true;
      }
    }

    // 衝突した
    if (is_hit && !IS_GAMEOVER && !IS_CLICK) {
        this.bloodFilter = BloodFilter().addChildTo(this.booldFilterLayer);
        this.bloodEffects = [];
        for(var i=0; i < 100; i++) {
          var bloodEffect = BloodEffect().addChildTo(this.booldFilterLayer);
          bloodEffect.x = this.player.x;
          bloodEffect.y = this.player.y;
          this.bloodEffects.push(bloodEffect);
        }
        IS_GAMEOVER = true;
    }

    if (IS_GAMEOVER) {
      var isAllBloodEffectDisappeared = true;
      for(var i=0; i < this.bloodEffects.length; i++) {
        if(this.bloodEffects[i].radius > 0) {
          isAllBloodEffectDisappeared = false;
        }
      }

      if(isAllBloodEffectDisappeared) {
        this.exit("gameover", {
          score: parseInt(this.score),
        });
      }
    }
  },

  onpointstart: function() {
    IS_CLICK = true;
  },

  onpointend: function() {
    IS_CLICK = false;
  },

  scoreUpdate: function() {
    if(IS_GAMEOVER) {
        return true;
    }

    if(IS_CLICK) {
      if(this.score > 0){
        this.score -= 1;
      }
    }else {
      if(this.frameCount != this.scoreUpFrameInterval) {
        this.frameCount += 1;
      } else {
        this.frameCount = 0;
        this.score += 50;
      }
    }
  }
});
