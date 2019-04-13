import { strings, tensStrings, thousandsStrings } from './constants';

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
 * @param {string} number The user's input
 * @returns {string} 
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
