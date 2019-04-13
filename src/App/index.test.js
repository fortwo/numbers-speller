// Utils
import { numberToEnglish } from '../utils';

it("1 -> 'one'", () => {
  expect(numberToEnglish(1)).toEqual('one');
});

it("5 -> 'five'", () => {
  expect(numberToEnglish(5)).toEqual('five');
});

it("10 -> 'ten'", () => {
  expect(numberToEnglish(10)).toEqual('ten');
});

it("11 -> 'eleven'", () => {
  expect(numberToEnglish(11)).toEqual('eleven');
});

it("12 -> 'twelve'", () => {
  expect(numberToEnglish(12)).toEqual('twelve');
});

it("18 -> 'eighteen'", () => {
  expect(numberToEnglish(18)).toEqual('eighteen');
});

it("20 -> 'twenty'", () => {
  expect(numberToEnglish(20)).toEqual('twenty');
});

it("19000 -> 'nineteen thousand'", () => {
  expect(numberToEnglish(19000)).toEqual('nineteen thousand');
});

it("319000 -> don't forget the 'and'", () => {
  expect(numberToEnglish(319000)).toEqual('three hundred and nineteen thousand');
});

it("1000000 -> 'one million'", () => {
  expect(numberToEnglish(1000000)).toEqual('one million');
});

it("1000001 -> 'one million and one'", () => {
  expect(numberToEnglish(1000001)).toEqual('one million and one');
});

it("1011011 -> 'one million eleven thousand and eleven'", () => {
  expect(numberToEnglish(1011011)).toEqual('one million eleven thousand and eleven');
});

it("all the ands", () => {
  expect(numberToEnglish(1101101)).toEqual('one million one hundred and one thousand one hundred and one');
});

it("-6000006 -> 'negative six million and six'", () => {
  expect(numberToEnglish(-6000006)).toEqual('negative six million and six');
});

it("100023999 -> 'one hundred million twenty-three thousand nine hundred and ninety-nine'", () => {
  expect(numberToEnglish(100023999)).toEqual('one hundred million twenty-three thousand nine hundred and ninety-nine');
});

it("Decimal numbers count each digit", () => {
  expect(numberToEnglish(3.14159)).toEqual('three point one four one five nine');
});

it("Include leading zeroes in decimals", () => {
  expect(numberToEnglish(0.0001)).toEqual('zero point zero zero zero one');
});

it("-65721.55531 -> 'negative sixty-five thousand seven hundred and twenty-one point five five five three one'", () => {
  expect(numberToEnglish(-65721.55531)).toEqual('negative sixty-five thousand seven hundred and twenty-one point five five five three one');
});

it("0 -> 'zero'", () => {
  expect(numberToEnglish(0)).toEqual('zero');
});

it("strings that evaluate to numbers are ok", () => {
  expect(numberToEnglish("6")).toEqual('six');
});

it("positive infinity", () => {
  expect(numberToEnglish(Number.POSITIVE_INFINITY)).toEqual('infinity');
});

it("negative infinity", () => {
  expect(numberToEnglish(Number.NEGATIVE_INFINITY)).toEqual('infinity');
});

it("Negative numbers should include the word 'negative' before the first digit", () => {
  expect(numberToEnglish(-50)).toEqual('negative fifty');
});

it("-1234567899 -> 'negative one billion two hundred and thirty-four million five hundred and sixty-seven thousand eight hundred and ninety-nine'", () => {
  expect(numberToEnglish(-1234567899)).toEqual('negative one billion two hundred and thirty-four million five hundred and sixty-seven thousand eight hundred and ninety-nine');
});

it("NaN should throw an error.", () => {
  expect(() => {
    numberToEnglish(NaN);
  }).toThrow();
});
