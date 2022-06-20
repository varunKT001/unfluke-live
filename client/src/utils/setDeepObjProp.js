export default function setDeepObjProp(obj, path, value) {
  if (path.length === 1) {
    obj[path] = value;
    return;
  }
  return setDeepObjProp(obj[path[0]], path.slice(1), value);
}
