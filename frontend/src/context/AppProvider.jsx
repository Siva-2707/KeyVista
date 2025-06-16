// context/AppProvider.js
import { useState } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <AppContext.Provider
      value={{isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
