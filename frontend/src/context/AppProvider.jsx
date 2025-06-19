// context/AppProvider.js
import { useState } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AppContext.Provider
      value={{isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
