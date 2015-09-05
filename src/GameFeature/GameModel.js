var GameModel = Backbone.Model.extend({
	// Initialize function
	initialize: function(){
		//Maze model
		this.set("mazeModel", new MazeModel({n: 9}));
	}
});