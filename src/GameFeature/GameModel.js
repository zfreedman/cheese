var GameModel = Backbone.Model.extend({
	// Initialize function
	initialize: function(){
    //Set the current level to level 1
    this.set("currLevel", 0);
		//Set the first level
    this.makeNextLevel();

    //Render
    this.render();
	},

  //A function to set the next level
  makeNextLevel: function(){
  	//Update the current level
  	this.set("currLevel", this.get("currLevel") + 1);
    //Maze model (for maze of size m, n = 2*m + 1)
    this.set("mazeModel", new MazeModel({n: 2*(this.get("currLevel") + 1) + 1}));
    //Update the timer
    this.setTimer();
  },

  //A function to setthe current timer
  //to the current level + 3 squared
  setTimer: function(){
    this.set("currTimer", Math.pow(this.get("currLevel") + 3, 2));
  },

  //A function to move the player
  //based on their current position
  movePlayer: function(params){
  	//Return false immedaitely if both parameters exceed a magnitude of 1
  	if(Math.abs(params.direction[0]) > 0 && Math.abs(params.direction[1]) > 0)
  		return false;
  	//Get the player's position
  	var playerPos = this.get("mazeModel").get("playerStart");
  	console.log(playerPos);
  	//Check if the direction is valid
    //NOTE: valid if position + dir isn't equal to '|' or '-'
    var newPlayerPos = [params.direction[0] + playerPos[0],
    	params.direction[1] + playerPos[1]];
    //Check if position in maze is valid
    var mazePos = this.get("mazeModel").get("maze")[newPlayerPos[0]][newPlayerPos[1]];
    if(mazePos !== "|" && mazePos != "-"){
    	//Move is valid, move the player
    	//Old position is empty space
    	this.get("mazeModel").get("maze")[playerPos[0]][playerPos[1]] = " ";
    	//New player pos is specified by a P
    	this.get("mazeModel").get("maze")[newPlayerPos[0]][newPlayerPos[1]] = "P";
    	this.get("mazeModel").set("playerStart", [newPlayerPos[0], newPlayerPos[1]]);
    	//If the maze position was cheese, decrement cheese count
    	if(mazePos === "*"){
    		this.get("mazeModel").set("currCheeseCount", this.get("mazeModel").get("currCheeseCount") - 1);
    	}
    	return true;
    }
    //Otherwise player move failed
    return false;
  },

  //Render function
  render: function(){

  }
});