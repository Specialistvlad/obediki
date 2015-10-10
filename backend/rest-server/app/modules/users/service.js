var Model = require('./model');
var mailingSystem = require('./../../utils/mailingSystem');
var validation = require('./validation');

function create(data) {
  var model;
  return validation.create(data)
    .then(function (data) {
      var template = {
        email: {
          value: data.email
        },
        credentials: {
          password: data.password
        }
      };
      if (data.role) {
        template.role = data.role;
      }
      model = new Model(template);
      return model.generateEmailToken();
    })
    .then(function() {
      return model.save();
    });
}

function createIfNotExists(data) {
  return findByEmail(data.email).then(function (res) {
    if (!res) {
      return create(data);
    }
  });
}

function findByEmailAndPassword(email, password) {
  return Model.findOne({
    'email.value': email,
    'credentials.password': password
    });
}

function findById(id) {
  return Model.findOne({_id: id});
}

function confirmEmail(token) {
  return Model.findOne({'email.confirmation.token': token})
    .then(function(user) {
      if (user) {
        return user.confirmEmailToken(token);
      } else {
        return new Promise(function(resolve, reject) {
          reject('Token not found!');
        });
      }
    });
}
//
// function getByUsernameAndPassword(username, password) {
//   return Model.findOne({'credentials.username': username, 'credentials.password': password});
// }

function findByResetPasswordToken(token) {
  return Model.findOne({'credentials.reset.token': token});
}

function setPassword(user, newPassword) {
  user.credentials.password = newPassword;
  return user.save(function(err) {
    return new Promise(function(resolve, reject) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function findByEmail(email) {
  return Model.findOne({'email.value': email});
}

function createTokenForPasswordReset(data) {
  var user;
  return findByEmail(data)
    .then(function (model) {
      if (!model) {
        throw new Error('User not found');
      }
      user = model;
      return user.createTokenForPasswordReset();
    })
    .then(function() {
      return user.save();
    });
  //console.log(data);
  // return new Promise(function(resolve, reject) {
  //   resolve('All is good!');
  // });
  //mailingSystem.send()
    // if (req.body && req.body.email) {
    //   var email = req.body.email;
    //   service.findByEmail(email).then(function(user) {
    //     if (user) {
    //       // Generate token
    //       service.setPasswordToken(user)
    //       .then(function(token) {
    //         // Send email to 'email' with token
    //         var resetUrl = req.protocol + '://' + req.headers.host + '/users/password/token/' + token;
    //         var htmlBody = '<p>To reset you password please click the following link: ' +
    //         '<a href="' + resetUrl + '">Reset password</a></p>';
    //         sendEmail(email, 'Password reset for adult site', htmlBody);
    //         responseHelper.ok(res, 'Reset password instruction is sent to email ' + email);
    //       })
    //       .catch(function(err) {
    //         return next(err);
    //       });
    //     } else {
    //       responseHelper.badRequest(res, 'There is no user with this email');
    //     }
    //   })
    //   .catch(function(err) {
    //     return next(err);
    //   });
    // } else {
    //   responseHelper.badRequest(res, 'Email address is required');
    // }
}

module.exports = {
  create,
  createIfNotExists,
  findByEmailAndPassword,
  findById,
  findByEmail,
  confirmEmail,
  findByResetPasswordToken,
  setPassword,
  createTokenForPasswordReset,
};
