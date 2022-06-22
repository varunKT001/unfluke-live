export default function getUserInput(
  label,
  testRegex,
  testName,
  defaultValue = ''
) {
  const value = prompt(label, defaultValue);
  if (!testRegex.test(value)) {
    return getUserInput(testName, testRegex, testName);
  } else {
    return value;
  }
}
