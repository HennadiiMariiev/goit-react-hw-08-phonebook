export const searchContactIndex = (array, element) => {
  return array.findIndex((item) => item.id === element.payload.id);
};
