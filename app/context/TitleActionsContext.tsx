// src/context/TitleActionsContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface TitleActionsContextType {
  titleActions?: ReactNode;
  setTitleActions: (actions: ReactNode) => void;
}

const TitleActionsContext = createContext<TitleActionsContextType | undefined>(
  undefined,
);

export const TitleActionsProvider = ({ children }: { children: ReactNode }) => {
  const [titleActions, setTitleActions] = useState<ReactNode>(null);

  return (
    <TitleActionsContext.Provider value={{ titleActions, setTitleActions }}>
      {children}
    </TitleActionsContext.Provider>
  );
};

export const useTitleActions = () => {
  const context = useContext(TitleActionsContext);
  if (!context) {
    throw new Error(
      "useTitleActions must be used within a TitleActionsProvider",
    );
  }
  return context;
};
