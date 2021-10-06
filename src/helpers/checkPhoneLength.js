export const isValidPhoneLength = (phoneStr) => {
  const arr = phoneStr.split('').filter((sym) => sym !== '(' && sym !== ')' && sym !== '-' && sym !== '+');
  return arr.length >= 5 && arr.length <= 12 ? true : false;
};
