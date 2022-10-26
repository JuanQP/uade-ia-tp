export function moveToBeginning(array, element) {
  return moveTo(array, 0, element);
}

export function moveToEnd(array, element) {
  return moveTo(array, array.length - 1, element);
}

export function moveToLeft(array, element) {
  const index = array.findIndex(e => e.id === element.id);
  return moveTo(array, index - 1, element);
}

export function moveToRight(array, element) {
  const index = array.findIndex(e => e.id === element.id);
  return moveTo(array, index + 1, element);
}

export function moveTo(array, position, element) {
  const filteredArray = array.filter(c => c.id !== element.id);
  return insertBetween(filteredArray, position, element);
}

export function insertBetween(array, position, element) {
  const firstHalf = array.slice(0, position);
  const secondHalf = array.slice(position);
  return [...firstHalf, element, ...secondHalf];
}
