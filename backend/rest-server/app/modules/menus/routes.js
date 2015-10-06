var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.get('/api/menus/next-week', /*roles.can('get next week menu'),*/ cnt.getNextWeek);
    app.get('/api/menus/:id', /*roles.can('get menu'),*/ cnt.find);
    app.post('/api/menus/:id', /*roles.can('update menu'),*/ cnt.update);
    app.delete('/api/menus/:id', /*roles.can('remove menu'),*/ cnt.remove);
    app.get('/api/menus/', /*roles.can('list menu'),*/ cnt.list);
    app.post('/api/menus/', /*roles.can('create menu'), */app.multer.single('file'), cnt.create);
  }
};
