import { digitStrings, tenStrings, periodStrings } from './dictionary';

/**
 * Split user's input into n-digits groups
 * @param {String|Number} number User's input
 * @param {Number} digits The number of digits for each group
 * @returns {Array} An array of objects containing the thousand group and value
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
      unit: periodStrings[iteration],
    });
    index -= digits;
    iteration++;
  }

  return groups;
}

/**
 * Converts a number (<1000) into words
 * @param {String} number The user's input
 * @param {String} unit A string representing the thousands group (e.g. 'thousand', 'million', 'billion')
 * @returns {String} The correct word name of the number
 */
export function getPeriodString(number, unit) {
  if (number === 0) {
    return '';
  }

  const hundreds = parseInt(number / 100);
  const rest = parseInt(number % 100);

  let result = '';
  result += hundreds > 0 ? `${digitStrings[hundreds]} hundred` : '';
  result += hundreds > 0 && rest > 0 ? ' and ' : '';

  // rest is < 20
  result += rest > 0 ? digitStrings[rest] || '' : '';

  // rest is >= 20
  if (!digitStrings[rest]) {
    const tens = parseInt(rest / 10);
    const units = parseInt(rest % 10);
    result += tens > 0 ? `${tenStrings[tens]}` : '';
    result += tens > 0 && units > 0 ? '-' : '';
    result += units > 0 ? `${digitStrings[units]}` : '';
  }

  return unit ? `${result} ${unit}` : result;
}

/**
 * Return the spelling of the decimal part of the user's input
 * @param {String|Number} number The decimal part of user's input
 * @returns {String} The correct word name of the number
 */
export function getDecimalString(number) {
  let result = '';

  number.split('').forEach(digit => {
    result += result !== '' ? ' ' : '';
    result += digitStrings[digit];
  });

  return result;
}

/**
 * Generate a string representing the word name of the number, up to a custom limit
 * limit is set to ±2 quadrillion by default
 * max limit is 9007199254740991, JavaScript MAX_SAFE_INTEGER
 * @param {String|Number} number User's input
 * @returns {String|Error} If limit is excedeed returns an error, otherwise a string 
 */
export function numberToEnglish(number, limit = 2e15) {
  // Check if its a valid number
  if (isNaN(number)) {
    throw new Error();
  }

  // Check infinity values
  const abs = Math.abs(number);
  if (abs > limit || abs > Number.MAX_SAFE_INTEGER) {
    return 'infinity';
  }

  // Split into WHOLE and DECIMAL
  const splitted = abs.toString().split('.');

  // Check zero/null values
  if (!number || (parseInt(abs) === 0 && !splitted[1])) {
    return digitStrings[0];
  }

  // Start WHOLE elaboration
  const groups = splitString(splitted[0]);

  let result = number < 0 ? 'negative' : '';
  groups.forEach(group => {
    // Add ' and ' only if the most right digits value is > 0 and < 100 and 
    result += result !== '' && result !== 'negative' && !group.unit && group.value > 0 && group.value < 100 ? ' and' : '';

    // Add space between periods only if it's necessary
    result += result !== '' && group.value > 0 ? ' ' : '';

    // Add period string
    result += getPeriodString(group.value, group.unit);
  });

  // Start DECIMAL elaboration
  result += parseInt(splitted[0]) === 0 ? getDecimalString(splitted[0]) : '';
  result += parseInt(splitted[1]) > 0 ? ` point ${getDecimalString(splitted[1].substring(0, 5))}` : '';

  return result;
}
