const fs = require('fs');

/**
 * Replaces the template strings in the templates with the actual values.
 * @param {Object} values - The user defined values to be rendered.
 * @param {Object} content - The content of the target template file.
 */
const mergeValues = (values, content) => {
  for (let value in values) {
    content = content.replace(`{{${value}}}`, values[value]);
  }

  return content;
}

/**
 * Handles the reading of files and merge in values.
 * @param {String} resourcePath - The path to the resource being read from disk.
 * @param {Object} values - The object that contains the values to inject into the template.
 * @param {Object} response - The response Object of the request we're writting into.
 */
const view = (resourcePath, values, response) => {
  let fileContents = fs.readFileSync(resourcePath, {encoding: 'utf8'});
  fileContents = mergeValues(values, fileContents);
  response.write(fileContents);
}

module.exports.view = view;