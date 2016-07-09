var Backbone = require('backbone');
var _ = require('underscore');
var ItemsView = require('./ItemsView');

var ListView = Backbone.View.extend({
  el: '<li></li>',

  template: _.template(
    '<span id="listview"><%= name %> </span>'),

  initialize: function() {
      this.model.fetch();
      this.listenTo(this.model, 'changed', this.render);
  },

  render: function() {
    this.$el.html('');
    this.$el.append(this.template({
      name: this.model.get('text'),
    }));

    var itemsView = new ItemsView({ collection : this.model.get('items') });
    this.$el.append(itemsView.render().el);
    return this;
  }


});

module.exports = ListView;
