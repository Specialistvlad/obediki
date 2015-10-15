var anonymous = [
  'create user',
  'login',
  'password reset',
  'confirm email',
  ];

var user = [
  'get next week menu',
  'have next week order',
];

var manager = [
  'create menus',
  'update menus',
  'get menus',
  'list menus',
  'remove menus',
  'list orders',
  'find orders',
];

var admin = [
  'list users',
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
