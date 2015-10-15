var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.get('/api/orders', roles.can('list orders'), cnt.list);
    app.get('/api/orders/next-week', roles.can('have next week order'), cnt.findNextWeek);
    app.put('/api/orders/next-week', roles.can('have next week order'), cnt.updateNextWeek);
    app.get('/api/orders/:id', roles.can('find orders'), cnt.findById);
  }
};
