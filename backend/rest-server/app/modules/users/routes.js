var cnt = require('./controller');

module.exports = {
  register: function(app, roles) {
    app.post('/api/users', cnt.create);
    app.post('/api/users/session', cnt.login);
    //app.delete('/api/users/session', roles.can('login'), cnt.logout;
    app.get('/api/users/confirm-email/:token', roles.can('confirm email'), cnt.confirmEmail);
    app.post('/api/users/password/token', roles.can('password reset'), cnt.createTokenForPasswordReset);
    app.post('/api/users/password', roles.can('password reset'), cnt.changePassword);
  }
};
