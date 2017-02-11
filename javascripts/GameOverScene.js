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

    this.label = Label('結果をツイート').addChildTo(this);
    this.label.x = 0;
    this.label.y = 0;
    this.label.fill = 'rgb(255, 255, 255)';
    this.label.fontSize = 14;
  },

  onclick: function () {
    var url = phina.social.Twitter.createURL({
      text: this.score + TITLE,
      hashtags: "",
      url: " https://smison.github.io/yukari/",
    });
    window.open(url, 'share window', 'width=480, height=320');
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

    // 結果ラベル
    this.resultLabel = Label(arguments[0].score).addChildTo(this);
    this.resultLabel.x = this.gridX.span(12);
    this.resultLabel.y = this.gridY.span(2);

    var play_button = PlayButton(this);
    play_button.x = this.gridX.span(13) + 25;
    play_button.y = this.gridY.span(7);
    play_button.addChildTo(this);

    var twitter_share_button = TwitterShareButton(arguments[0].score);
    twitter_share_button.x = this.gridX.span(13) + 25;
    twitter_share_button.y = this.gridY.span(13);
    twitter_share_button.addChildTo(this);
  },
});
