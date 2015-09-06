var GameView = Backbone.View.extend({
	template: _.template('<div id="container"><div id="maze-bg"></div></div>'),
	// Initialize function
	initialize: function(params){
		//Set the model
		this.model = params.model;
		this.render();
		this.mazeView = new MazeView(params);
		$('maze-bg').append(this.mazeView.$el);
	},

	//Render function
	render: function(){
		this.$el.html(this.template);
	}
});