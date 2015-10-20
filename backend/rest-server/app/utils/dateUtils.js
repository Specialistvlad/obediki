module.exports = {
	createDateAsUTC,
	getNextWeekDate,
	startAndEndOfWeek,
}

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
