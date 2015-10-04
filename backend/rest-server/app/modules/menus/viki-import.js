var Promise = require('bluebird');
var xlsx = require('xlsx');

module.exports = function parseViki(argument, options) {
  var maxThingsPerDay = 150;
  var maxRows;
  var daysOfWeek = ['понедельник', 'вторник', 'среда' , 'четверг', 'пятница'];
  var ignoreList = ['Название блюда', 'Итого'];
  var columnsName = {
    'name': 'A',
    'weight': 'B',
    'cost': 'C'
  };

  return new Promise(function(resolve, reject) {
    var workbook;
    try {
      if (options && options.type && options.type === 'binary') {
        var data = new Uint8Array(argument);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        workbook = xlsx.read(arr.join(""), options);
      } else {
        workbook = xlsx.readFile(argument);
      }
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } catch (e) {
        return reject(e);
    }

    var weekMenu = {};
    var dayMenu;
    var dayIndex = -1;
    var skip;
    var i = 0;

    while (true) {
      i++;
      try {
        var value = worksheet['A'+i].v;
      } catch (e) {
        console.log('cell not found');
        break;
      }

      if (ignoreList.indexOf(value) > -1) {
        continue;
      }

      //find day name in cell
      for (j=0; j<daysOfWeek.length; j++) {
        skip = false;
        if (value.trim().toLowerCase().indexOf(daysOfWeek[j].toLowerCase()) > -1) {
          dayMenu = [];
          weekMenu[j] = dayMenu;
          skip = true;
          break;
        }
      }

      if ((!skip) && dayMenu) {
        var tmpObj = {
          name: value
        };

        try {
          tmp = worksheet[columnsName.weight+i].v;
          tmpObj.weight = tmp;
          tmp = worksheet[columnsName.cost+i].v;
          tmpObj.cost = tmp;
          dayMenu.push(tmpObj);
        } catch (e) {
          console.log('can\'t get value', columnsName.weight+i, ' or ', columnsName.cost+i,'of', value);
          continue;
        }
      }
    }
    weekMenu.importedFrom = 'viki';
    resolve(weekMenu);
  });
}
