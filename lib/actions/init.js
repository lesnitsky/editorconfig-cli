var fs       = require('fs');
var path     = require('path');
var inquirer = require('inquirer');
var rules    = require('../rules');
var ECFile   = require('../ECFile');

var cwd = process.cwd();

var questions = rules.map(function (rule) {
	return rule.toQuestion();
});

function writeDefaults() {
	var ecfile = new ECFile({ root: true });
	var defaults = rules.reduce(function (defaults, rule) {
		defaults[rule.name] = rule.defaultValue;
		return defaults;
	}, {});

	ecfile.addSection('*', defaults);
	ecfile.writeSync(cwd);

	console.log(ecfile.toString());
}

function done(answers) {
	var ecfile = new ECFile({ root: true });
	ecfile.addSection('*', answers);

	process.stdout.write('\n' + ecfile.toString() + '\n');

	inquirer.prompt([{
		name: 'ok',
		message: 'Ok?',
		default: true,
		type: 'confirm'
	}], function (answer) {
		if (answer.ok) {
			ecfile.writeSync(cwd);
		} else {
			process.stdout.write('\n');
			inquirer.prompt(questions, done);
		}
	});
}

module.exports = function (cmd) {
	if (cmd.yes) {
		return writeDefaults();
	}

	inquirer.prompt(questions, done);
};
