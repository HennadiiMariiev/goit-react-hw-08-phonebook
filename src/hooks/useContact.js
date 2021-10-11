import { useState, useEffect } from 'react';
import * as regex from '../helpers/regexpPatterns';

export function useContact(deps = null) {
  const [contact, setContact] = useState({ number: deps?.number || '', name: deps?.name || '' });
  const [error, setError] = useState({ number: false, name: false });

  useEffect(() => {
    regex.name.test(contact.name)
      ? setError((prev) => ({ ...prev, name: false }))
      : setError((prev) => ({ ...prev, name: true }));
    regex.number.test(contact.number)
      ? setError((prev) => ({ ...prev, number: false }))
      : setError((prev) => ({ ...prev, number: true }));
  }, [contact]);

  return [contact, setContact, error];
}
