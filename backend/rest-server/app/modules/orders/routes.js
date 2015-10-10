var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.put('/api/orders/next-week', roles.can('update next-week orders'), cnt.create);
    app.post('/api/orders/:id', roles.can('create orders'), cnt.update);
    app.get('/api/orders/:id', roles.can('get orders'), cnt.getNextWeek);
  }
};
