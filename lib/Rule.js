module.exports = Rule;

function Rule(config) {
	this.name = config.name;
	this.type = config.type;
	this.defaultValue = config.defaultValue || null;

	if (this.type === 'enum') {
		this.values = config.values;
	}
}

Rule.prototype.getReadableName = function () {
	return this.name.split('_').join(' ');
};

Rule.prototype.toQuestion = function () {
	var q = {};

	q.name = this.name;
	q.message = this.getReadableName() + '?';

	switch(this.type) {
		case 'enum':
			q.type = 'list';
			q.choices = this.values;
			break;
		case 'bool':
			q.type = 'confirm';
			break;
		default:
			q.type = 'input';
	}

	q.default = this.defaultValue;

	return q;
};
