const allowSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '(', ')'];

export const isAllowedKeyCode = (key) => {
  for (let i = 0; i < allowSymbols.length; i += 1) {
    if (
      key.nativeEvent.data === allowSymbols[i] ||
      key.nativeEvent.inputType === 'deleteContentBackward' ||
      key.nativeEvent.inputType === 'deleteContentForward' ||
      key.type === 'change'
    ) {
      return true;
    }
  }
  return false;
};
