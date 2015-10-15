var Model = require('./model');

function findNextWeek(id, user) {
  var date = startAndEndOfWeek(getNextWeekDate());
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
        var date = startAndEndOfWeek(getNextWeekDate());
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


function createDateAsUTC(date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function getNextWeekDate() {
  var date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}

function startAndEndOfWeek(date) {
  // If no date object supplied, use current date
  // Copy date so don't modify supplied date
  var now = date? new Date(date) : new Date();

  // set time to some convenient value
  now.setHours(0,0,0,0);

  // Get the previous Monday
  var monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  // Get next Sunday
  var sunday = new Date(now);
  sunday.setHours(23,59,59,999);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  // Return array of date objects
  return [createDateAsUTC(monday), createDateAsUTC(sunday)];
}
