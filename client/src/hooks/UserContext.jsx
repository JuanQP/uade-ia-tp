import { createContext, useContext, useState } from 'react';

export const Context = createContext();

export const useUserContext = () => useContext(Context);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    nombre: 'Invitado',
  });

  const contextValue = { user, setUser };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
