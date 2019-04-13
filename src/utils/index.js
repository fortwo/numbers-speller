import { strings, tensStrings, thousandsStrings } from './constants';

/**
 * Split user's input into n-digits groups
 * @param {String|Number} number User's input
 * @param {Number} digits The number of digits for each group
 * @returns {Array} An array of objects containing unit and value
 */
export function splitString(number, digits = 3) {
  const groups = [];

  const string = number.toString();
  let index = string.length;

  let iteration = 0;
  while (index > 0) {
    const firstIndex = index - digits >= 0 ? index - digits : 0;
    groups.unshift({
      value: parseInt(string.substring(firstIndex, index)),
      unit: thousandsStrings[iteration],
    });
    index -= digits;
    iteration++;
  }

  return groups;
}

/**
 * Converts a number (<1000) into words
 * @param {String} number The user's input
 * @returns {String} The correct english spelling for the number
 */
export function getPeriodString(number, unit) {
  if (number === 0) {
    return '';
  }

  const hundreds = parseInt(number / 100);
  const rest = parseInt(number % 100);

  let result = '';
  result += hundreds > 0 ? `${strings[hundreds]} hundred` : '';
  result += hundreds > 0 && rest > 0 ? ' and ' : '';

  if (rest >= 20) {
    const tens = parseInt(rest / 10);
    const units = parseInt(rest % 10);
    result += tens > 0 ? `${tensStrings[tens]}` : '';
    result += tens > 0 && units > 0 ? '-' : '';
    result += units > 0 ? `${strings[units]}` : '';
  } else if (rest > 0) {
    result += strings[rest];
  }

  return unit ? `${result} ${unit}` : result;
}

/**
 * Generate a string representing spelled number (up to 2 quadrillion)
 * @param {String|Number} number User's input
 * @returns {String|Error} 
 */
export function numberToEnglish(number) {
  // Check if its a valid number
  if (isNaN(number)) {
    throw new Error();
  }

  // Check zero/null values
  if (!number || parseInt(number) === 0) {
    return strings[0];
  }

  // Check infinity values
  const abs = Math.abs(number);
  if (abs > 2e15) {
    return 'infinity';
  }

  // Start elaboration
  const groups = splitString(abs);

  let result = number < 0 ? 'negative' : '';
  groups.forEach(group => {
    // Add ' and ' only if the most right digits value is > 0 and < 100 and 
    result += result !== '' && result !== 'negative' && !group.unit && group.value > 0 && group.value < 100 ? ' and' : '';

    // Add space between periods only if it's necessary
    result += result !== '' && group.value > 0 ? ' ' : '';

    // Add period string
    result += getPeriodString(group.value, group.unit);
  });
  return result;
}
