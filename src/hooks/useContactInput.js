import { useEffect, useState } from 'react';

export const useContactInput = (initial, pattern, deps = null) => {
  const [value, setValue] = useState(initial);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (deps) setValue(deps);
  }, [deps]);

  useEffect(() => {
    if (pattern.test(value) || value.length === 0) setIsError(false);
    else setIsError(true);
  }, [value, pattern]);

  return [value, setValue, isError];
};
