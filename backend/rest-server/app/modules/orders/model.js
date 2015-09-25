'use strict';
var mongoose = require('mongoose');
var MenuItem = require('./../menus/schema').MenuItem;

var schema = mongoose.Schema({
  approved: {
    type: 'Boolean',
    default: false
  },
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
    approved: 1,
    createdAt: 1
  };

  return this.find({}, pattern).sort({createdAt: -1});
}

schema.statics.getItem = function getList (id) {
  return Model.findOne({_id: id});
}

schema.statics.getCurrent = function getCurrent (id) {
  return Model.findOne({approved: true});
}

schema.statics.createMenu = function createMenu (menu) {
  return (new Model(menu)).save();
}

var Model = mongoose.model('orders', schema);
module.exports = Model;
