
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

    // 一番左側の背景が十分画面外に来たら、一番右に背景を足して一番左の背景を削除
    if(this.backgrounds[0].x < -SCREEN_WIDTH) {
      var newBackground = Background().addChildTo(this.backgroundLayer);
      newBackground.x = this.backgrounds[2].x + SCREEN_WIDTH;
      newBackground.y = this.gridY.center();
      this.backgrounds.push(newBackground);
      var oldBackground = this.backgrounds.shift();
      oldBackground.remove();
    }

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
