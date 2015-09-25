var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.get('/api/order/current', roles.can('get current order'), cnt.getCurrent);
    app.get('/api/order/current', roles.can('update current order'), cnt.updateCurrent);
  }
};
