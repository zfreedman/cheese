var CellView = Backbone.View.extend({
  template: _.template('<div class="cell"></div>'),

  initialize: function(i) {
    this.render(i);
    return this.$el;
  },

  render: function(i) {
    this.$el.html(this.template).attr('id', i);
  }
});