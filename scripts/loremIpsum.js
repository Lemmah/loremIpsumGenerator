const fs = require('fs');
const loremIpsumBuffer = fs.readFileSync('./data/loremIpsum.json');
const loremIpsum = JSON.parse(loremIpsumBuffer.toString());
const paragraphs = loremIpsum.paragraphs;
// There are only 5 paragraphs thus we need to get a random index within range.
const randomIndex = Math.floor(Math.random() * 4) + 1;

/**
 * Returns sentence(s) with a given number of characters/letters.
 * @param {String} number - The number of letters to return.
 * @return {String} - Sentence(s) with the specified number of words. 
 */
const getLetters = (number) => {
  let randomWords = paragraphs[randomIndex];
  while (randomWords.length <= number) {
    randomWords += paragraphs[randomIndex];
  }
  const countedWords = randomWords.slice(0, number).toLowerCase();

  return `<p>${countedWords}</p>`;
}

/**
 * Gets number of words specified from the lorem ipsum data.
 * @param {Number} number - The number of words to return.
 * @return {String} - A lowercase string with the number of words requested.
 */
const getWords = (number) => {
  let randomWords = paragraphs[randomIndex].split(' ');
  while (randomWords.length <= number) {
    randomWords = randomWords.concat(paragraphs[randomIndex].split(' '));
  }
  const countedWords = randomWords.slice(0, number).join(' ').toLowerCase().replace('.', '');
  return `<p>${countedWords}</p>`;
}

/**
 * Generates the number of paragraphs specified.
 * @param {Number} number - The number of paragraphs to be generated.
 * @return {String} - Formatted paragraphs of the specified number.
 */
const getParagraphs = (number) => {
  let paragraphs_ = [paragraphs[0]];
  while (paragraphs_.length < number) {
    paragraphs_.push(paragraphs[randomIndex]);
  }
  paragraphs_ = paragraphs_.map(paragraph => `<p>${paragraph}</p>`);

  return paragraphs_.join(' ');
}

module.exports.get = {
  letters: getLetters,
  words: getWords,
  paragraphs: getParagraphs
}
