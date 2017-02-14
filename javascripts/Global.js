phina.globalize();
var IS_CLICK = false;
var IS_GAMEOVER = false;
var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 400;
var TITLE = "I don't believe in ghosts!";
var SCENES = [
  {
    label: 'title',
    className: 'TitleScene',
    nextLabel: 'main'
  },
  {
    label: 'main',
    className: 'MainScene',
    nextLabel: 'gameover'
  },
  {
    label: 'gameover',
    className: 'GameOverScene',
    nextLabel: 'title',
    nextLabel: 'main',
  },
];
var ASSETS = {
  image: {
    'player': './images/player.png',
    'shadow': './images/shadow.png',
    'slime': './images/slime.png',
    'background': './images/background.png',
  },
  spritesheet: {
    'player_ss': 'spritesheets/player.ss',
    'shadow_ss': 'spritesheets/shadow.ss',
    'slime_ss': 'spritesheets/slime.ss',
  }
}

// min から max までの乱数を返す関数
var getRandomArbitary = function(min, max) {
  return Math.random() * (max - min) + min;
}
