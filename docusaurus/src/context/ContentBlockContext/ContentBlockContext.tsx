import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

type ContextType = {
  filePath: string | undefined;
  highlight: string | undefined;
  activeId: string | null;
  setFilePath: Dispatch<SetStateAction<string | undefined>>;
  setHighlight: Dispatch<SetStateAction<string | undefined>>;
  setActiveId: Dispatch<SetStateAction<string | null>>;
};

const defaultValue: ContextType = {
  filePath: undefined,
  highlight: undefined,
  activeId: null,
  setFilePath: () => undefined,
  setHighlight: () => undefined,
  setActiveId: () => undefined,
};

export const ContentBlockContext = createContext<ContextType>(defaultValue);

const ContentBlockContextProvider = ({children}) => {
  const [filePath, setFilePath] = useState<string>();
  const [highlight, setHighlight] = useState<string>();
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <ContentBlockContext.Provider
      value={{
        filePath,
        highlight,
        activeId,
        setFilePath,
        setHighlight,
        setActiveId,
      }}
    >
      {children}
    </ContentBlockContext.Provider>
  );
};

export default ContentBlockContextProvider;
