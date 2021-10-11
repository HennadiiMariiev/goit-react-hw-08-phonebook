import { useState, useEffect } from 'react';
import * as regex from '../helpers/regexpPatterns';

export function useUser() {
  const [user, setUser] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState({ email: false, password: false, name: false });

  useEffect(() => {
    regex.name.test(user.name)
      ? setError((prev) => ({ ...prev, name: false }))
      : setError((prev) => ({ ...prev, name: true }));
    regex.email.test(user.email)
      ? setError((prev) => ({ ...prev, email: false }))
      : setError((prev) => ({ ...prev, email: true }));
    regex.password.test(user.password)
      ? setError((prev) => ({ ...prev, password: false }))
      : setError((prev) => ({ ...prev, password: true }));
  }, [user]);

  return [user, setUser, error];
}
