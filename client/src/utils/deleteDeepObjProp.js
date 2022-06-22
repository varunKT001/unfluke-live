export default function deleteDeepObjProp(obj, path) {
  if (path.length === 1) {
    delete obj[path];
    return;
  }
  return deleteDeepObjProp(obj[path[0]], path.slice(1));
}
