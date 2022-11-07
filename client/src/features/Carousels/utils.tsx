interface ObjectWithID {
  id: number;
}

export function moveToBeginning<T extends ObjectWithID>(array: T[], element: T) {
  return moveTo(array, 0, element);
}

export function moveToEnd<T extends ObjectWithID>(array: T[], element: T) {
  return moveTo(array, array.length - 1, element);
}

export function moveToLeft<T extends ObjectWithID>(array: T[], element: T) {
  const index = array.findIndex(e => e.id === element.id);
  return moveTo(array, index - 1, element);
}

export function moveToRight<T extends ObjectWithID>(array: T[], element: T) {
  const index = array.findIndex(e => e.id === element.id);
  return moveTo(array, index + 1, element);
}

export function moveTo<T extends ObjectWithID>(array: T[], position: number, element: T) {
  const filteredArray = array.filter(c => c.id !== element.id);
  return insertBetween(filteredArray, position, element);
}

export function insertBetween<T extends ObjectWithID>(
  array: T[],
  position: number,
  element: T,
) {
  const firstHalf = array.slice(0, position);
  const secondHalf = array.slice(position);
  return [...firstHalf, element, ...secondHalf];
}
