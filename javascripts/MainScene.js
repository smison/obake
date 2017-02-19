
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
    this.scoreLayer = Layer().addChildTo(this);

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

    // タイトル
    this.title = Label(TITLE).addChildTo(this.playerLayer);
    this.title.fill = 'rgb(255, 255, 255)';
    this.title.fontSize = 18;
    this.title.x = this.gridX.span(11) + 10;
    this.title.y = this.gridY.span(2) + 10;

    // 下線
    this.underLine = phina.display.PathShape({
        stroke: 'rgb(255, 255, 255)',
        fill:  'rgb(255, 255, 255)',
        strokeWidth: 1
    }).addChildTo(this.playerLayer);
    this.underLine
        .addPath(this.title.x - 120, this.title.y + 12)
        .addPath(this.title.x + 120, this.title.y + 12);

    // click to start
    this.clickToStart = Label("click to start").addChildTo(this.playerLayer);
    this.clickToStart.fill = 'rgb(255, 255, 255)';
    this.clickToStart.fontSize = 15;
    this.clickToStart.x = this.gridX.span(13) + 20;
    this.clickToStart.y = this.gridY.span(3) + 10;

    // 闇
    DarkFilter().addChildTo(this.darkFilterLayer);
  },

  titleUpdate: function() {
    if(IS_TITLE_TO_MAIN) {
      this.title.alpha -= 0.05;
      this.title.fontSize += 0.2;
      if(this.title.alpha <= 0) {
          this.title.alpha = 0;
      }
    }

    if(this.title.alpha == 0 && this.label == null) {
      // スコアラベル
      this.label = Label(this.score).addChildTo(this.scoreLayer);
      this.label.fontSize = 25;
      this.label.fill = 'white';
      this.label.x = this.gridX.span(20);
      this.label.y = this.gridY.span(2);
      this.label.tweener
          .wait(500)
          .to({
              x:this.gridX.span(13),
              y:this.gridY.span(2)
          }, 1300, "easeOutExpo");

      IS_TITLE = false;
    }
  },

  mainUpdate: function() {
    this.scoreUpdate();

    this.label.text = "Brave: " + this.score;

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
      var enemyType = getRandomInt(0, 4);

      var enemy = null;
      if(enemyType == 0) {
        // 大スライム配置
        enemy = Slime().addChildTo(this.enemyLayer);
        enemy.x = this.gridX.center(5);
        enemy.bottom = this.gridY.center(8);
        this.enemyGroup.push(enemy);
      } else if (enemyType == 1) {
        // 鳥配置
        enemy = Bird().addChildTo(this.enemyLayer);
        enemy.x = this.gridX.center(5);
        enemy.bottom = this.gridY.center(1);
        this.enemyGroup.push(enemy);
      } else{
        // 小スライム配置
        enemy = SmallSlime().addChildTo(this.enemyLayer);
        enemy.x = this.gridX.center(5);
        enemy.bottom = this.gridY.center(8);
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
        BloodFilter().addChildTo(this.booldFilterLayer);
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
        this.blackOutFilter = RectangleShape().addChildTo(this.booldFilterLayer);
        this.blackOutFilter.width = SCREEN_WIDTH;
        this.blackOutFilter.height = SCREEN_HEIGHT;
        this.blackOutFilter.x = SCREEN_WIDTH / 2;
        this.blackOutFilter.y = SCREEN_HEIGHT / 2;
        this.blackOutFilter.fill = 'black';
        this.blackOutFilter.stroke = 'black';
        this.blackOutFilter.alpha = 0; // tweenerを使うので明示的にalphaプロパティが必要
        this.blackOutFilter.tweener
          .by({
              alpha: 1,
          }, 1000) // 1秒かけてalpha=1に
          .call(function() {
            this.exit("gameover", {
              score: parseInt(this.score),
            });
          },
        this);
      }
    }
  },

  update: function () {
    if(IS_TITLE) {
      this.titleUpdate();
    } else {
      this.mainUpdate();
    }

    // 一番左側の背景が十分画面外に来たら、一番右に背景を足して一番左の背景を削除
    if(this.backgrounds[0].x < -SCREEN_WIDTH) {
      var newBackground = Background().addChildTo(this.backgroundLayer);
      newBackground.x = this.backgrounds[2].x + SCREEN_WIDTH;
      newBackground.y = this.gridY.center();
      this.backgrounds.push(newBackground);
      var oldBackground = this.backgrounds.shift();
      oldBackground.remove();
    }

  },

  onclick: function() {
    if(IS_TITLE) {
      // フェードアウトして削除
      this.underLine.tweener
          .by({
              alpha: -1,
              x: -100
          })
          .call(function() {
              this.remove();
          }, this)
      ;

      // フェードアウトして削除
      this.clickToStart.tweener
          .by({
              alpha: -1,
              x: 50
          })
          .call(function() {
              this.remove();
          }, this)
      ;
      IS_TITLE_TO_MAIN = true;
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
