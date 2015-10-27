var inquirer = require('inquirer');
var rules    = require('../rules');
var ECFile   = require('../ECFile');

var cwd = process.cwd();

var questions = [{
	name: 'sectionName',
	message: 'File path pattern? (e.g lib/*.{js})',
	validate: function (answer) {
		return answer.trim().length > 0;
	}
}, {
	name: 'rules',
	message: 'What rules do you want to add to this section?',
	type: 'checkbox',
	choices: rules.map(function (rule) {
		return {
			name: rule.getReadableName(),
			value: rule,
			checked: true
		};
	}),
	validate: function (answer) {
		if (answer.length > 0) {
			return true;
		}

		return 'Select at least one rule';
	}
}];

module.exports = function () {
	var ecfile = ECFile.readSync(cwd);
	
	inquirer.prompt(questions, function (answers) {
		var sectionName = answers.sectionName;

		var questions = answers.rules.map(function (rule) {
			return rule.toQuestion();
		});

		inquirer.prompt(questions, function (answers) {
			ecfile.addSection(sectionName, answers);
			ecfile.writeSync(cwd);
		});
	});
};
