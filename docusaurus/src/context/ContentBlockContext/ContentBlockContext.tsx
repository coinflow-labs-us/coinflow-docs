import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Blockchains, Languages, Product} from '@site/src/types';
import {
  CHAIN_OPTIONS,
  LANGUAGE_OPTIONS,
  PRODUCT_OPTIONS,
} from '@site/src/utils/constants';

type ContextType = {
  filePath: string | undefined;
  highlight: string | undefined;
  activeId: string | null;
  isFileLoading: boolean;
  languageValue: Languages;
  chainValue: Blockchains;
  productValue: Product;
  setFilePath: Dispatch<SetStateAction<string | undefined>>;
  setHighlight: Dispatch<SetStateAction<string | undefined>>;
  setActiveId: Dispatch<SetStateAction<string | null>>;
  setIsFileLoading: Dispatch<SetStateAction<boolean>>;
  setLanguageValue: Dispatch<SetStateAction<Languages>>;
  setChainValue: Dispatch<SetStateAction<Blockchains>>;
  setProductValue: Dispatch<SetStateAction<Product>>;
};

const defaultValue: ContextType = {
  filePath: undefined,
  highlight: undefined,
  activeId: null,
  isFileLoading: false,
  languageValue: undefined,
  chainValue: undefined,
  productValue: undefined,
  setFilePath: () => undefined,
  setHighlight: () => undefined,
  setActiveId: () => undefined,
  setIsFileLoading: () => undefined,
  setLanguageValue: () => undefined,
  setChainValue: () => undefined,
  setProductValue: () => undefined,
};

const ContentBlockContext = createContext<ContextType>(defaultValue);

export const ContentBlockContextProvider = ({children}) => {
  const [filePath, setFilePath] = useState<string>();
  const [highlight, setHighlight] = useState<string>();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const [languageValue, setLanguageValue] = useState<Languages>(
    LANGUAGE_OPTIONS[0].value
  );
  const [chainValue, setChainValue] = useState<Blockchains>(
    CHAIN_OPTIONS[0].value
  );
  const [productValue, setProductValue] = useState<Product>(
    PRODUCT_OPTIONS[0].value
  );

  return (
    <ContentBlockContext.Provider
      value={{
        filePath,
        highlight,
        activeId,
        isFileLoading,
        languageValue,
        chainValue,
        productValue,
        setFilePath,
        setHighlight,
        setActiveId,
        setIsFileLoading,
        setLanguageValue,
        setChainValue,
        setProductValue,
      }}
    >
      {children}
    </ContentBlockContext.Provider>
  );
};

export default ContentBlockContext;
