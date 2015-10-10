'use strict';
var mongoose = require('mongoose');
var MenuItem = require('./../menus/schema').MenuItem;

var schema = mongoose.Schema({
  approved: {
    type: 'Boolean',
    default: false
  },
  date: Date,
  importedFrom: String,
  '0': [MenuItem],
  '1': [MenuItem],
  '2': [MenuItem],
  '3': [MenuItem],
  '4': [MenuItem]
});

schema.plugin(require('mongoose-timestamp'));
schema.plugin(require('mongoose-unique-validator'));

schema.statics.list = function list () {
  var pattern = {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    createdAt: 1
  };

  return this.find({}, pattern).sort({createdAt: -1});
}

schema.statics.getByOwnerAndDate = function getByOwnerAndDate (userId, dateFrom, dateTo) {
  return Model.findOne({
    _id: userId,
    created_at: {
      $gte: dateFrom,
      $lt: dateTo
    }
  });
}

schema.statics.createOrder = function createOrder (menu) {
  return (new Model(menu)).save();
}

var Model = mongoose.model('orders', schema);
module.exports = Model;
