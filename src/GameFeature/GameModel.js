var GameModel = Backbone.Model.extend({
	// Initialize function
	initialize: function(){
    //Set the current level to level 1
    this.set("currLevel", 1);
		//Set the first level
    this.makeNextLevel();

    //Render
    this.render();
	},

  //A function to set the next level
  makeNextLevel: function(){
    //Maze model (for maze of size m, n = 2*m + 1)
    this.set("mazeModel", new MazeModel({n: 2*(this.get("currLevel") + 1) + 1}));
  },

  //Render function
  render: function(){

  }
});