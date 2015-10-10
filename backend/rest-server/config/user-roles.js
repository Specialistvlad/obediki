var anonymous = [
  'create user',
  'login',
  'password reset',
  'confirm email',
  ];

var user = [
  'get next week menu',
  'get orders',
  'update orders',
];

var manager = [
  'create menus',
  'update menus',
  'get menus',
  'list menus',
];

var admin = [
  'oops',
];

user = user.concat(anonymous);
manager = manager.concat(user);
admin = admin.concat(manager);

module.exports = {
  anonymous,
  user,
  manager,
  admin
}
