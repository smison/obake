
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

    // スコアラベル
    this.label = Label(this.score).addChildTo(this);
    this.label.x = this.gridX.span(12);
    this.label.y = this.gridY.span(2);

    // 床配置
    this.floor = RectangleShape({
        width: SCREEN_WIDTH,
        height: 50,
        fill: 'silver'
    }).addChildTo(this).setPosition(this.gridX.center(0), this.gridY.center(8));

    this.backgroundLayer = Layer().addChildTo(this);
    this.enemyLayer = Layer().addChildTo(this);
    this.darkFilterLayer = Layer().addChildTo(this);
    this.playerLayer = Layer().addChildTo(this);
    this.booldFilterLayer = Layer().addChildTo(this);

    // プレイヤー配置
    this.player = Player().addChildTo(this.playerLayer);
    this.player.x = this.gridX.center(-4.5);
    this.player.bottom = this.floor.top;

    // 敵配置
    this.enemy = Enemy().addChildTo(this.enemyLayer);
    this.enemy.x = this.gridX.center(8);
    this.enemy.bottom = this.floor.top;

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
        BloodFilter().addChildTo(this.booldFilterLayer);
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
