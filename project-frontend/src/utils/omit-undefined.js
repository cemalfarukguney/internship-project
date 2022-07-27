export default function omitUndefined(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];

    if (val === undefined) {
      return acc;
    }

    acc[key] = val;

    return acc;
  }, {});
}
