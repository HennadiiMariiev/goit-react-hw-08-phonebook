import { useEffect, useState } from 'react';

export const useContactInput = (initial, deps, pattern) => {
  const [value, setValue] = useState(initial);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setValue(deps);
  }, [deps]);

  useEffect(() => {
    if (pattern.test(value)) {
      console.log(pattern.test(value));
      setIsError(false);
    } else setIsError(true);
  }, [value]);

  return [value, setValue, isError];
};
