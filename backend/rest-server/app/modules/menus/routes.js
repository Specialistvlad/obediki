var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.get('/api/menus/next-week', /*roles.can('get next week menu'),*/ cnt.getNextWeek);
    app.get('/api/menus/:id', /*roles.can('get menu'),*/ cnt.getItem);
    app.get('/api/menus/', /*roles.can('list menu'),*/ cnt.list);
  }
};
