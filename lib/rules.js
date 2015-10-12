var Rule = require('./Rule');

module.exports = [{
	name: 'charset',
	type: 'enum',
	values: ['utf-8', 'latin1', 'utf-16le', 'utf-16be']
}, {
	name: 'indent_style',
	type: 'enum',
	values: ['tab', 'space']
}, {
	name: 'indent_size',
	type: 'number',
	defaultValue: 2
}, {
	name: 'end_of_line',
	type: 'enum',
	values: ['lf', 'crlf', 'cr']
}, {
	name: 'trim_trailing_whitespace',
	type: 'bool',
	defaultValue: true
}, {
	name: 'insert_final_newline',
	type: 'bool',
	defaultValue: true
}].map(function (ruleConfig) {
	return new Rule(ruleConfig);
});
