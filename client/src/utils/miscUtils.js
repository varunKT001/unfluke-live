function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

function deleteDeepObjProp(obj, path) {
  if (path.length === 1) {
    delete obj[path];
    return;
  }
  return deleteDeepObjProp(obj[path[0]], path.slice(1));
}

function getUserInput(label, testRegex, testName, defaultValue = '') {
  const value = prompt(label, defaultValue);
  if (!testRegex.test(value)) {
    return getUserInput(testName, testRegex, testName);
  } else {
    return value;
  }
}

function range(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

function setDeepObjProp(obj, path, value) {
  if (path.length === 1) {
    obj[path] = value;
    return;
  }
  return setDeepObjProp(obj[path[0]], path.slice(1), value);
}

function getDeepObjProp(obj, path) {
  if (path.length === 1) {
    return obj[path];
  }
  return getDeepObjProp(obj[path[0]], path.slice(1));
}

function camalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export {
  capitalizeFirstLetter,
  deepCopy,
  deleteDeepObjProp,
  getUserInput,
  range,
  setDeepObjProp,
  getDeepObjProp,
  camalize,
};
