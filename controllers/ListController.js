var ListModel = require('../models/ListModel.js');
var ItemModel = require('../models/ItemModel.js');
var mongoose = require('mongoose');
var reversePopulate = require('mongoose-reverse-populate');
/**
* ListController.js
*
* @description :: Server-side logic for managing lists.
*/
module.exports = {

  /**
  * ListController.list()
  */
  list: function (req, res) {
  ListModel.find(function (err, lists) {
    //...
    var opts = {
      modelArray: lists, // the collection of primary models we are running reverse populate on
      storeWhere: 'items', // the attribute on each of the primary models to place the foreign models
      arrayPop: true, // tells us if the population is an array of models or another single model
      mongooseModel: ItemModel, // the type of model (foreign) that will be reverse-populated
      idField: 'list', // the attribute on the foreign model that connects it to the primary model
      populate: 'tags' // optional populate call you can run on each foreign model
    }

      reversePopulate(opts, function(err, lists) { // call the reverse populate, passing in the options from above
          return res.json(lists); // return the response after all of the populating is done
      });
  });
},

  /**
  * ListController.show()
  */
  show: function (req, res) {
  var id = req.params.id;
  ListModel.findOne({_id: id}, function (err, list) {
    if (err) {
      return res.json(500, {
        message: 'Error getting list.'
      });
    }
    if (!list) {
      return res.json(404, {
        message: 'No such list'
      });
    }
    // populating tag! WWUUTT!!??
    ItemModel.find({ list: mongoose.Types.ObjectId(list._id) }).populate('tags').exec(function(err, items) {
      list.items = items;
      return res.json(list);
    });
  });
},

  /**
  * ListController.create()
  */
  create: function (req, res) {
    var list = new ListModel({			text : req.body.text,			items : req.body.items
    });

    list.save(function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error saving list',
          error: err
        });
      }
      return res.json(list);
    });
  },

  /**
  * ListController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    ListModel.findOne({_id: id}, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error saving list',
          error: err
        });
      }
      if (!list) {
        return res.json(404, {
          message: 'No such list'
        });
      }

      list.text = req.body.text ? req.body.text : list.text;			list.items = req.body.items ? req.body.items : list.items;      item.name = req.body.name ? req.body.name : item.name;
    item.tags = req.body.tags ? req.body.tags : item.tags;
      list.save(function (err, list) {
        if (err) {
          return res.json(500, {
            message: 'Error getting list.'
          });
        }
        if (!list) {
          return res.json(404, {
            message: 'No such list'
          });
        }
        return res.json(list);
      });
    });
  },

  /**
  * ListController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    ListModel.findByIdAndRemove(id, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }
      return res.json(list);
    });
  }
};
