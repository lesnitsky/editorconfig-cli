var fs       = require('fs');
var path     = require('path');
var inquirer = require('inquirer');
var rules    = require('../rules');

var cwd = process.cwd();

var questions = rules.map(function (rule) {
	return rule.toQuestion();
});

function done(answers) {
	var options = [];

	var content = 'root = true';

	content += '\n\n';
	content += '[*]\n';

	for (var key in answers) {
		options.push(key + ' = ' + answers[key]);
	}

	content = content + options.join('\n') + '\n';

	process.stdout.write(content);

	inquirer.prompt([{
		name: 'ok',
		message: 'Ok?',
		default: true,
		type: 'confirm'
	}], function (answer) {
		if (answer.ok) {
			createEditorconfigFile(content);
		} else {
			process.stdout.write('\n');
			inquirer.prompt(questions, done);
		}
	});
}

function createEditorconfigFile(content) {
	fs.writeFileSync(path.join(cwd, '.editorconfig'), content);
}

module.exports = function () {
	inquirer.prompt(questions, done);
};
