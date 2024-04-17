var Rule = require('./Rule');

module.exports = [
  {
    name: 'charset',
    type: 'enum',
    values: ['utf-8', 'latin1', 'utf-16le', 'utf-16be'],
    defaultValue: 'utf-8',
  },
  {
    name: 'indent_style',
    type: 'enum',
    values: ['space', 'tab'],
    defaultValue: 'space',
  },
  {
    name: 'indent_size',
    type: 'number',
    defaultValue: 2,
  },
  {
    name: 'end_of_line',
    type: 'enum',
    values: ['lf', 'crlf', 'cr'],
    defaultValue: 'lf',
  },
  {
    name: 'trim_trailing_whitespace',
    type: 'bool',
    defaultValue: true,
  },
  {
    name: 'insert_final_newline',
    type: 'bool',
    defaultValue: true,
  },
  {
    // https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties#max_line_length
    name: 'max_line_length',
    type: 'number',
    defaultValue: 100,
  },
  {
    // https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties#max_line_length:~:text=Domain-,quote_type,-single%2C%20double
    name: 'quote_type',
    type: 'enum',
    values: ['single', 'double', 'auto'],
    defaultValue: 'auto',
  },
].map(function (ruleConfig) {
  return new Rule(ruleConfig);
});
