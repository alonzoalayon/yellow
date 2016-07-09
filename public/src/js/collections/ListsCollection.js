var Backbone = require('backbone');
var _ = require('underscore');
var ItemsCollection = require('./ItemsCollection');
var TagsCollection = require('./TagsCollection')
var ListModel = require('../models/ListModel');
var ListsCollection = Backbone.Collection.extend({
  url: '/lists',
model: ListModel
  });
module.exports = ListsCollection;
