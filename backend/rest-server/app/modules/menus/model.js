'use strict';
var mongoose = require('mongoose');
var MenuItem = new mongoose.Schema(require('./schema').MenuItem);

var schema = mongoose.Schema({
  approved: {
    type: 'Boolean',
    default: false
  },
  seen: {
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
    createdAt: 1,
    seen: 1,
  };

  return this.find({}, pattern).sort({createdAt: -1});
}

schema.statics.findById = function findById (id) {
  return Model.findOne({_id: id});
}

schema.statics.removeById = function removeById (id) {
  return Model.findOneAndRemove({_id: id});
}

schema.statics.findCurrent = function findCurrent (id) {
  return Model.findOne({approved: true}).sort({createdAt: -1});
}

schema.statics.createMenu = function createMenu (menu) {
  return (new Model(menu)).save();
}

var Model = mongoose.model('menu', schema);
module.exports = Model;
