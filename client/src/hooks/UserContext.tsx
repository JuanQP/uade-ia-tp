import { createContext, useContext, useState } from 'react';

const UserContext = createContext<any>(null);

interface UserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState({
    nombre: 'Invitado',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
}
