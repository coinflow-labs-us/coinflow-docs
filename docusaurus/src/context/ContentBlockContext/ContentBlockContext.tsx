import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

type ContextType = {
  filePath: string | undefined;
  highlight: string | undefined;
  activeId: string | null;
  isFileLoading: boolean;
  setFilePath: Dispatch<SetStateAction<string | undefined>>;
  setHighlight: Dispatch<SetStateAction<string | undefined>>;
  setActiveId: Dispatch<SetStateAction<string | null>>;
  setIsFileLoading: Dispatch<SetStateAction<boolean>>;
};

const defaultValue: ContextType = {
  filePath: undefined,
  highlight: undefined,
  activeId: null,
  isFileLoading: false,
  setFilePath: () => undefined,
  setHighlight: () => undefined,
  setActiveId: () => undefined,
  setIsFileLoading: () => undefined,
};

export const ContentBlockContext = createContext<ContextType>(defaultValue);

const ContentBlockContextProvider = ({children}) => {
  const [filePath, setFilePath] = useState<string>();
  const [highlight, setHighlight] = useState<string>();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  return (
    <ContentBlockContext.Provider
      value={{
        filePath,
        highlight,
        activeId,
        isFileLoading,
        setFilePath,
        setHighlight,
        setActiveId,
        setIsFileLoading,
      }}
    >
      {children}
    </ContentBlockContext.Provider>
  );
};

export default ContentBlockContextProvider;
