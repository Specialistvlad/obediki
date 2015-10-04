var anonymous = [
  'create user',
  'login',
  'password reset',
  'confirm email',
  ];

var user = [
  'get next week menu',
];

var manager = [
  'get current',
  'get menu',
  'list menu',
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
