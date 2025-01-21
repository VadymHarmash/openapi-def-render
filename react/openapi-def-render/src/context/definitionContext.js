import { createContext, useState } from "react";

export const DefinitionContext = createContext();

export const DefinitionProvider = ({ children }) => {
  const [definition, setDefinition] = useState(null);

  const value = {
    definition,
    setDefinition,
  };

  return (
    <DefinitionContext.Provider value={value}>
      {children}
    </DefinitionContext.Provider>
  );
};
