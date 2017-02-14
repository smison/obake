
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

    // 背景配置
    this.background = Background().addChildTo(this.backgroundLayer);
    this.background.x = this.gridX.center();
    this.background.y = this.gridY.center();

    this.background2 = Background().addChildTo(this.backgroundLayer);
    this.background2.x = this.gridX.center() + SCREEN_WIDTH;
    this.background2.y = this.gridY.center();

    // 影配置
    this.shadow = Shadow().addChildTo(this.darkFilterLayer);
    this.shadow.x = this.gridX.center(-5);
    this.shadow.bottom = this.gridY.center(7.7);

    // プレイヤー配置
    this.player = Player().addChildTo(this.playerLayer);
    this.player.x = this.gridX.center(-4.5);
    this.player.bottom = this.gridY.center(8);

    // 敵配置
    this.enemy = Enemy().addChildTo(this.enemyLayer);
    this.enemy.x = this.gridX.center(5);
    this.enemy.bottom = this.gridY.center(8);

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

    if (this.player.hitTestElement(this.enemy)
        && !IS_GAMEOVER
        && !IS_CLICK) {

        IS_GAMEOVER = true;
        this.bloodFilter = BloodFilter().addChildTo(this.booldFilterLayer);
        this.exit("gameover", {
          score: parseInt(this.score),
        });
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
