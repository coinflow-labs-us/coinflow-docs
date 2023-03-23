import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

type ContextType = {
  filePath: string | undefined;
  highlight: string | undefined;
  setFilePath: Dispatch<SetStateAction<string>>;
  setHighlight: Dispatch<SetStateAction<string>>;
};

const defaultValue: ContextType = {
  filePath: undefined,
  highlight: undefined,
  setFilePath: () => undefined,
  setHighlight: () => undefined,
};

export const ContentBlockContext = createContext<ContextType>(defaultValue);

const ContentBlockContextProvider = ({children}) => {
  const [filePath, setFilePath] = useState();
  const [highlight, setHighlight] = useState();
  return (
    <ContentBlockContext.Provider
      value={{filePath, highlight, setFilePath, setHighlight}}
    >
      {children}
    </ContentBlockContext.Provider>
  );
};

export default ContentBlockContextProvider;
