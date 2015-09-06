var MazeView = Backbone.View.extend({
  template: _.template("<div id='maze'></div>"),

	initialize: function(params){
		//Set the model
		this.model = params.model;
		
    var currLevel = params.model.get('currLevel');
    //Render
		return this.$el;
	},

	//Render function
	render: function(currLevel){
    this.$el.html(this.template());

    for(var i = 0; i <= currLevel; i++) {
      $row = '<div class=row id="' + i + '"></div>'
      for(j = 0; j <= currLevel; j++) {
        $($row).append(new CellView(j));
      }
      this.$el.append($row);
    }
  }
});