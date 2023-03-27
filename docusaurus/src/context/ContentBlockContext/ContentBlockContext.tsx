import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Blockchains, Languages, Product} from '@site/src/types';
import {
  CHAIN_OPTIONS,
  LANGUAGE_OPTIONS,
  PRODUCT_OPTIONS,
} from '@site/src/utils/constants';

type ActiveBlock = {
  id: string;
  filePath: string;
  highlight?: string;
};

type ContextType = {
  activeBlockFile: string | undefined;
  highlight: string | undefined;
  activeBlock?: ActiveBlock;
  isFileLoading: boolean;
  languageValue: Languages;
  chainValue: Blockchains;
  productValue: Product;
  fileValue: string | undefined;
  setActiveBlockFile: Dispatch<SetStateAction<string | undefined>>;
  setHighlight: Dispatch<SetStateAction<string | undefined>>;
  setActiveBlock: Dispatch<SetStateAction<ActiveBlock | undefined>>;
  setIsFileLoading: Dispatch<SetStateAction<boolean>>;
  setLanguageValue: Dispatch<SetStateAction<Languages>>;
  setChainValue: Dispatch<SetStateAction<Blockchains>>;
  setProductValue: Dispatch<SetStateAction<Product>>;
  setFileValue: Dispatch<SetStateAction<string | undefined>>;
};

const defaultValue: ContextType = {
  activeBlockFile: undefined,
  highlight: undefined,
  activeBlock: undefined,
  isFileLoading: false,
  languageValue: undefined,
  chainValue: undefined,
  productValue: undefined,
  fileValue: undefined,
  setActiveBlockFile: () => undefined,
  setHighlight: () => undefined,
  setActiveBlock: () => undefined,
  setIsFileLoading: () => undefined,
  setLanguageValue: () => undefined,
  setChainValue: () => undefined,
  setProductValue: () => undefined,
  setFileValue: () => undefined,
};

const ContentBlockContext = createContext<ContextType>(defaultValue);

export const ContentBlockContextProvider = ({children}) => {
  const [activeBlockFile, setActiveBlockFile] = useState<string>();
  const [highlight, setHighlight] = useState<string>();
  const [activeBlock, setActiveBlock] = useState<ActiveBlock>();

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
  const [fileValue, setFileValue] = useState<string>();

  return (
    <ContentBlockContext.Provider
      value={{
        activeBlockFile,
        highlight,
        activeBlock,
        isFileLoading,
        languageValue,
        chainValue,
        productValue,
        fileValue,
        setActiveBlockFile,
        setHighlight,
        setActiveBlock,
        setIsFileLoading,
        setLanguageValue,
        setChainValue,
        setProductValue,
        setFileValue,
      }}
    >
      {children}
    </ContentBlockContext.Provider>
  );
};

export default ContentBlockContext;
