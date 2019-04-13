export function splitString(number, digits = 3) {
  const groups = [];

  const string = number.toString();
  let index = string.length;

  while (index > 0) {
    const firstIndex = index - digits >= 0 ? index - digits : 0;
    groups.unshift(string.substring(firstIndex, index));
    index -= digits;
  }

  return JSON.stringify(groups);
}
