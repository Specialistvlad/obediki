var dateUtils = require('../../utils/dateUtils');
var Model = require('./model');

function findNextWeek(id, user) {
  var date = dateUtils.startAndEndOfWeek(dateUtils.getNextWeekDate());
  return Model.findByOwnerAndDate(user._id, date[0], date[1]);
}

function list() {
  return Model.list();
}

function findById(id) {
  return Model.findOne({_id: id});
}

function updateNextWeek(data, user) {
  return findNextWeek(null, user)
    .then(function (order) {
      if (order) {
        order['0'] = data['0'];
        order['1'] = data['1'];
        order['2'] = data['2'];
        order['3'] = data['3'];
        order['4'] = data['4'];
        return order.save();
      } else {
        var date = dateUtils.startAndEndOfWeek(getNextWeekDate());
        data.dateFrom = date[0];
        data.dateTo = date[1];
        return Model.createOrder(data, user._id);
      }
    });
}

module.exports = {
  list,
  findById,
  findNextWeek,
  updateNextWeek,
};
