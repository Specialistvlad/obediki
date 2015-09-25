var path = require('path');
var config = require('./../config');

module.exports = {
    importTest: function importTest(name, absolutePath, title) {
        describe(title ? title : name, function () {
            require(path.join(absolutePath, name));
        });
    },
    importModel: function importModel(name, absolutePath) {
      return require(path.join('../app/modules/', name, '/model'));
    },
    url: config.web.address,
    request: require('super-request')
};
