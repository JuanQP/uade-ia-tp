/**
 * Returns a function that expects an HTMLInput element in order to set that value
 * @param {*} setter The "setValue" of a useState
 * @returns
 */
export function setFieldValue(setter) {
  return (element) => setter(element.target.value);
}
