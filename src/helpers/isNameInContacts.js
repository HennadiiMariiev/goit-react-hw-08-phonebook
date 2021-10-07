export const isNameInContacts = (array, searchName) => array.find(({ name }) => name === searchName);
export const isIdInContacts = (array, searchName, searchId) =>
  array.find(({ name, id }) => name === searchName && searchId !== id);
