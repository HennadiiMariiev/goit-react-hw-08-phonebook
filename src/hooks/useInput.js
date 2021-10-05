import { useState, useEffect } from 'react';

export const useInput = (initial, pattern) => {
  const [value, setValue] = useState(initial);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (pattern.test(value)) {
      console.log(pattern.test(value));
      setIsError(false);
    } else setIsError(true);
  }, [value]);

  return [value, setValue, isError];
};
