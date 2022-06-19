export default function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
