var mongoose = require('mongoose');

var MenuItem = {
  name: String,
  description: String,
  count: String,
  measureBy: String,
  cost: String
};

module.exports = {
  MenuItem: MenuItem
}
