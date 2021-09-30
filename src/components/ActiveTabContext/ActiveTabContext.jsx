import React, { createContext, useContext, useState } from 'react';

const ActiveTabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const [active, setActive] = useState('register');

  const toggleActive = (tab) => setActive(tab);

  return <ActiveTabContext.Provider value={{ active, toggleActive }}>{children}</ActiveTabContext.Provider>;
};

export const useTabContext = () => useContext(ActiveTabContext);
