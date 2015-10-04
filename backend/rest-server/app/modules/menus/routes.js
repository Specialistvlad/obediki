var cnt = require('./controller');
var multer  = require('multer')();

module.exports = {
  register: function(app, roles) {
    app.get('/api/menus/next-week', /*roles.can('get next week menu'),*/ cnt.getNextWeek);
    app.get('/api/menus/:id', /*roles.can('get menu'),*/ cnt.find);
    app.get('/api/menus/', /*roles.can('list menu'),*/ cnt.list);
    app.post('/api/menus/', /*roles.can('create menu'), */multer.single('file'), cnt.create);
  }
};
