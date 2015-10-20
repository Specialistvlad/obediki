var validator = require('validator');

module.exports = {
  notEmpty: function (value) {
    return value ? null : 'Must be not empty';
  },

  isString: function (value) {
    return typeof value === 'string' ? null : 'Must be a string';
  },

  isEmail: function (value) {
    return validator.isEmail(value) ? null : 'This is not email';
  },

  isPassword: function (value) {
    return /^[\w\-]{6,30}$/.test(value ? value : '') ? null : 'Wrong password';
  },

  isDate: function (value) {
    try {
      Date(value)
    } catch (e) {
      return 'Wrong date';
    }
  },

  isDateAndYearEqual: function (value, year) {
    if (!year) {
      year = new Date().getFullYear();
    }
    if (new Date(value).getFullYear() != year) {
      return 'You must set current year';
    }
  },

  isDateGreatThenCurrent: function (value) {
    if ((new Date(value)) < (new Date())) {
      return 'Date must be great or equal than today';
    }
  },
}
