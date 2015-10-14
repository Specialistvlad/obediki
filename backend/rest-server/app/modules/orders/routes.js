var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.get('/api/orders/next-week', roles.can('have next week order'), cnt.findNextWeek);
    app.put('/api/orders/next-week', roles.can('have next week order'), cnt.updateNextWeek);
  }
};
