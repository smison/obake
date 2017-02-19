phina.globalize();
var IS_TITLE = true;
var IS_TITLE_TO_MAIN = false;
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
  },
];
var ASSETS = {
  image: {
    'player': './images/player.png',
    'shadow': './images/shadow.png',
    'slime': './images/slime.png',
    'small_slime': './images/small_slime.png',
    'bird': './images/bird.png',
    'background': './images/background.png',
  },
  spritesheet: {
    'player_ss': 'spritesheets/player.ss',
    'shadow_ss': 'spritesheets/shadow.ss',
    'slime_ss': 'spritesheets/slime.ss',
    'small_slime_ss': 'spritesheets/small_slime.ss',
    'bird_ss': 'spritesheets/bird.ss',
  }
}

// min から max までの整数値乱数を返す関数
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

// min から max までの実数値乱数を返す関数
var getRandomArbitary = function(min, max) {
  return Math.random() * (max - min) + min;
}
