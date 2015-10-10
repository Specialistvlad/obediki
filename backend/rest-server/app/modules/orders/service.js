var Model = require('./model');

function getNextWeekDate() {
  var date = new Date();
  date.setDate(date.getDate() + AddDaysHere);
  return date;
}

function getNextWeek(id, user) {
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
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

    // Return array of date objects
    return [monday, sunday];
  }


  var date = startAndEndOfWeek(getNextWeekDate());
  return Model.getByOwnerAndDate(user._id, date[0], date[1]);
}

function findById(id) {
  return Model.find({_id: id});
}

function updateNextWeek(id, user) {
  console.log(arguments);
  return getNextWeek(id, user)
    .then(function (orders) {
      if (order) {

      } else {
        var date = startAndEndOfWeek(getNextWeekDate());
        Model.createOrder(date[0]);
      }
    });
}

module.exports = {
  findById,
  getNextWeek,
  updateNextWeek
};
