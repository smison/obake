phina.define('TwitterShareButton', {
  superClass: 'CircleShape',

  init: function (score) {
    this.superInit({
      stroke: false,
      radius: 66,
      fill: 'rgb(64, 64, 64)',
      stroke: 'rgb(64, 64, 64)',
      strokeWidth: 2,
    });
    this.setInteractive(true);
    this.score = score;
    this.url = "https://smison.github.io/obake/";
    this.hashtag = "#obake";

    this.label = Label('結果をツイート').addChildTo(this);
    this.label.x = 0;
    this.label.y = 0;
    this.label.fill = 'rgb(255, 255, 255)';
    this.label.fontSize = 14;
  },

  onclick: function () {
      var Tweettxt = encodeURIComponent("ゆうき: "
        + this.score
        + " "
        + this.url
        + " "
        + this.hashtag);
      window.open("http://twitter.com/intent/tweet?text=" + Tweettxt);
  },
});

phina.define('PlayButton', {
  superClass: 'CircleShape',

  init: function (scene) {
    this.superInit({
      stroke: false,
      radius: 66,
      fill: 'rgb(64, 64, 64)',
      stroke: 'rgb(64, 64, 64)',
      strokeWidth: 2,
    });
    this.setInteractive(true);

    this.label = Label('もう一回').addChildTo(this);
    this.label.x = 0;
    this.label.y = 0;
    this.label.fill = 'rgb(255, 255, 255)';
    this.label.fontSize = 14;
    this.scene = scene;
  },

  onclick: function () {
    IS_GAMEOVER = false;
    this.scene.exit();
  },
});

phina.define('GameOverScene', {
  superClass: 'ResultScene',

  init: function () {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: 'rgb(255, 255, 255)',
      score: arguments[0].score,
      message: '',
    });

    // デフォルトで表示されているものを消す
    this.playButton.remove();
    this.scoreText.remove();
    this.scoreLabel.remove();
    this.shareButton.remove();

    this.bloodFilter = BloodFilter().addChildTo(this);

    // 結果ラベル
    this.resultLabel = Label(arguments[0].score).addChildTo(this);
    this.resultLabel.x = this.gridX.span(12);
    this.resultLabel.y = this.gridY.span(2);
    this.resultLabel.tweener
      .wait(500)
      .to({
        x:this.gridX.center(),
        y:this.gridY.center(-3)
      }, 1300, "easeOutExpo");

    this.play_button = PlayButton(this).addChildTo(this);
    this.play_button.x = this.gridX.span(-10);
    this.play_button.y = this.gridY.span(-10);
    this.play_button.tweener
      .wait(500)
      .to({
        x:this.gridX.center(-3),
        y:this.gridY.center(2)
      }, 1300, "easeOutExpo");

    this.tweet_button = TwitterShareButton(arguments[0].score).addChildTo(this);
    this.tweet_button.x = this.gridX.span(-10);
    this.tweet_button.y = this.gridY.span(-10);
    this.tweet_button.tweener
      .wait(500)
      .to({
        x:this.gridX.center(3),
        y:this.gridY.center(2)
      }, 1300, "easeOutExpo");
  },
});
