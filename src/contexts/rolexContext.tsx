import { createContext, useState } from "react";

export const RolexContext = createContext(undefined);
export const RolexProvider = ({ children }) => {
  const [rolexContact, setRolexContact] = useState(false);

  const updateRolexContact = (value) => {
    setRolexContact(value)
  }
  return <RolexContext.Provider value={{ rolexContact, updateRolexContact }}>{children}</RolexContext.Provider>;
};
