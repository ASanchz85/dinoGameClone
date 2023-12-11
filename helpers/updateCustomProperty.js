export function getCustomProperty(elem, property) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(property)) || 0;
}

export function setCustomProperty(elem, property, value) {
  elem.style.setProperty(property, value);
}

export function incrementCustomProperty(elem, property, increment) {
  const current = getCustomProperty(elem, property);
  setCustomProperty(elem, property, current + increment);
}