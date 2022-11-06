export function moveToBeginning(array: any[], element: any) {
  return moveTo(array, 0, element);
}

export function moveToEnd(array: any[], element: any) {
  return moveTo(array, array.length - 1, element);
}

export function moveToLeft(array: any[], element: any) {
  const index = array.findIndex(e => e.id === element.id);
  return moveTo(array, index - 1, element);
}

export function moveToRight(array: any[], element: any) {
  const index = array.findIndex(e => e.id === element.id);
  return moveTo(array, index + 1, element);
}

export function moveTo(array: any[], position: number, element: any) {
  const filteredArray = array.filter(c => c.id !== element.id);
  return insertBetween(filteredArray, position, element);
}

export function insertBetween(array: any[], position: number, element: any) {
  const firstHalf = array.slice(0, position);
  const secondHalf = array.slice(position);
  return [...firstHalf, element, ...secondHalf];
}
