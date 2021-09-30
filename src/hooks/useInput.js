import { useState, useEffect } from 'react';

export const useInput = (input) => {
  const [value, setValue] = useState(() => '');

  useEffect(() => {
    function isValidInput(input) {
      if (!input.value.match(input.pattern) && input.value.length) return false;

      return true;
    }

    if (!isValidInput(input.current)) {
      input.current.style = 'background-color: #f7d7d7;';
    } else {
      input.current.style = 'background-color: transparent;';
    }
  }, [value, input]);

  return [value, setValue];
};
