var mongoose = require('mongoose');
var MenuItem = new mongoose.Schema(require('./../menus/schema').MenuItem);
MenuItem.add({
  id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
})

var schema = mongoose.Schema({
  dateFrom: Date,
  dateTo: Date,
  ownerId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  '0': [MenuItem],
  '1': [MenuItem],
  '2': [MenuItem],
  '3': [MenuItem],
  '4': [MenuItem],
});

schema.plugin(require('mongoose-timestamp'));
schema.plugin(require('mongoose-unique-validator'));

schema.statics.list = function list () {
  var pattern = {
    dateFrom: 1,
    dateTo: 1,
    ownerId: 1,
    createdAt: 1,
    updatedAt: 1,
  };

  var userPattern = {
    'email.value': 1
  };

  return this.find({}, pattern)
    .populate('ownerId', userPattern)
    .sort({createdAt: -1});
}

schema.statics.findByOwnerAndDate = function findByOwnerAndDate (userId, dateFrom, dateTo) {
  var query = {
    ownerId: new mongoose.Types.ObjectId(userId),
    dateFrom: {
      $gte: dateFrom,
    },
    dateTo: {
      $lte: dateTo
    }
  };
  return Model.findOne(query);
}

schema.statics.createOrder = function createOrder (order, userId) {
  order.ownerId = new mongoose.Types.ObjectId(userId);
  return (new Model(order)).save();
}

schema.statics.updateOrder = function updateOrder (id, data) {
  order.ownerId = new mongoose.Types.ObjectId(userId);
  return (new Model(order)).save();
}

var Model = mongoose.model('orders', schema);
module.exports = Model;
