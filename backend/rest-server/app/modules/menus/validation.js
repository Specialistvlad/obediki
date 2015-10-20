var ValidatorHelper = require('./../../utils/validation');

function importMenu(data) {
	var v = new ValidatorHelper(data);
	v.notEmpty('file');
	v.notEmpty('dateFrom');
	v.isDate('dateFrom');
	v.isDateAndYearEqual('dateFrom');
	v.isDateGreatThenCurrent('dateFrom');
	return v.promisify();
}

module.exports = {
	importMenu,
};
