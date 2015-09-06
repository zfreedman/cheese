//Create a game model and append to body
var gameModel = new GameModel();
var gameView = new GameView({model: gameModel});
$("body").append(gameView.$el);