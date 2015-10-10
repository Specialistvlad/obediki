var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.get('/api/menus/next-week', roles.can('get next week menu'), cnt.getNextWeek);
    app.get('/api/menus/:id', roles.can('get menus'), cnt.find);
    app.post('/api/menus/:id', roles.can('update menus'), cnt.update);
    app.delete('/api/menus/:id', roles.can('remove menus'), cnt.remove);
    app.get('/api/menus/', roles.can('list menus'), cnt.list);
    app.post('/api/menus/', roles.can('create menus'), app.multer.single('file'), cnt.create);
  }
};
