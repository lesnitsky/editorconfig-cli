var fs       = require('fs');
var path     = require('path');
var ecparser = require('editorconfig/lib/ini');

module.exports = ECFile;

function ECFile(config) {
	this.root = config.root || false;
	this.sections = config.sections || [];
}

ECFile.readSync = function (folder) {
	var sections = ecparser.parseSync(path.join(folder, '.editorconfig'));
	var config = {
		root: false,
		sections: []
	};

	sections.forEach(function (section) {
		var sectionName = section[0];
		var rules = section[1];

		if (!sectionName) {
			if (rules.root) {
				config.root = true;
			}
			return;
		}

		config.sections.push(new Section(sectionName, rules));
	});

	return new ECFile(config);
};

ECFile.prototype.writeSync = function (folder) {
	fs.writeFileSync(path.join(folder, '.editorconfig'), this.toString());
};

ECFile.prototype.addSection = function (sectionName, rules) {
	this.sections.push(new Section(sectionName, rules));
};

ECFile.prototype.toString = function () {
	return (this.root ? 'root = true\n\n' : '') +
		this.sections.map(function (section) {
			return section.toString();
		})
		.join('\n\n') + '\n';
};

function Section(name, rules) {
	this.name = name;
	this.rules = rules;
}

Section.prototype.toString = function () {
	var heading = '[' + this.name + ']\n';
	var body = [];

	for (var key in this.rules) {
		body.push(key + ' = ' + this.rules[key]);
	}

	return heading + body.join('\n');
};
