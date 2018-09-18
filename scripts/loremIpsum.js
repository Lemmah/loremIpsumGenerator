const fs = require('fs');
const loremIpsumBuffer = fs.readFileSync('./data/loremIpsum.json');
const loremIpsum = JSON.parse(loremIpsumBuffer.toString());
const paragraphs = loremIpsum.paragraphs;

/**
 * Gets a random number to be used as an index to access entities
 * such as letters or paragraphs. ie paragraphs[randomIndex(entity)];
 * @param {String} entity - The name of the entity ie paragraph or letter.
 * @return {Number} - The random index within range of available entities.
 */
const randomIndex = entity => {
  if (entity === 'paragraph') {
    return Math.floor(Math.random() * 4) + 1;
  } else if (entity === 'letter') {
    return Math.floor(Math.random() * 5) + 1;
  }
};

/**
 * Gets number of words specified from the lorem ipsum data.
 * @param {Number} number - The number of words to return.
 * @return {String} - A lowercase string with the number of words requested.
 */
const getWords = (number) => {
  let randomWords = paragraphs[randomIndex('paragraph')].replace('.', '').split(' ');
  while (randomWords.length <= number) {
    randomWords.concat(paragraphs[randomIndex('paragraph')].replace('.', '').split(' '));
  }
  return randomWords.slice(0, number).join(' ').toLowerCase();
}

module.exports.firstParagraph = paragraphs[0];
module.exports.randomParagraph = paragraphs[randomIndex('paragraph')];
module.exports.getWords = getWords;