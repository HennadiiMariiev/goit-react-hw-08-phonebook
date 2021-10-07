import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoading } from 'redux/loading/loading-selector';

export const useCurrentButton = () => {
  const [isCurrentButton, setIsCurrentButton] = useState(false);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    if (!isLoading) {
      setIsCurrentButton(false);
    }
  }, [isLoading]);

  return [isCurrentButton, setIsCurrentButton];
};
