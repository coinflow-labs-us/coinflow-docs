import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import CodeFromFile from '@site/src/components/CodeFromFile';
import {Blockchains, Languages, Product} from '@site/src/types';
import {
  FiltersWrapper,
  SplitView,
} from '@site/src/components/IntegrationBuilder/Select/styledComponents';
import Select from '@site/src/components/Select';
import FileList from '@site/src/components/IntegrationBuilder/FileList/FileList';
import ContentFromFile from '@site/src/components/ContentFromFile';
import CodeNotFound from '@site/src/components/CodeFromFile/CodeNotFound';
import {ContentBlockContext} from '@site/src/context/ContentBlockContext/ContentBlockContext';

const CODE_LINE_HEIGHT = 22.04;

const languageOptions: Array<{value: Languages; label: string}> = [
  {value: 'react', label: 'React'},
  {value: 'vue', label: 'Vue'},
];
const chainOptions: Array<{value: Blockchains; label: string}> = [
  {value: 'solana', label: 'Solana'},
  {value: 'polygon', label: 'Polygon'},
];
const productOptions: Array<{value: Product; label: string}> = [
  {value: 'checkout', label: 'Checkout'},
  {value: 'offramp', label: 'Offramp'},
];

const IntegrationBuilder = () => {
  const scrollRef = useRef(null);
  const [languageValue, setLanguageValue] = useState<Languages>(
    languageOptions[0].value
  );
  const [chainValue, setChainValue] = useState<Blockchains>(
    chainOptions[0].value
  );
  const [productValue, setProductValue] = useState<Product>(
    productOptions[0].value
  );
  const [fileValue, setFileValue] = useState<string>();

  const [filePaths, setFilePaths] = useState<string[]>([]);

  const {filePath, highlight, isFileLoading, setFilePath} =
    useContext(ContentBlockContext);

  const loadConfig = useCallback(async () => {
    try {
      const result = await import(
        `@site/src/content/${languageValue}/${chainValue}/${productValue}/config.ts`
      );
      setFilePaths(result.files);
      setFileValue(result.files[0]);
      setFilePath(result.files[0]);
    } catch (error) {
      setFilePaths([]);
    }
  }, [languageValue, chainValue, productValue]);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: CODE_LINE_HEIGHT * (parseInt(highlight) - 1),
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    setFileValue(filePath);
  }, [filePath]);

  useEffect(() => {
    if (!isFileLoading) handleScroll();
  }, [highlight, isFileLoading]);

  return (
    <>
      <FiltersWrapper>
        <div>
          <Select
            defaultValue={languageOptions[0]}
            onChange={newValue => setLanguageValue(newValue.value)}
            options={languageOptions}
          />
        </div>
        <div>
          <Select
            defaultValue={chainOptions[0]}
            onChange={newValue => setChainValue(newValue.value)}
            options={chainOptions}
          />
        </div>
        <div>
          <Select
            defaultValue={productOptions[0]}
            onChange={newValue => setProductValue(newValue.value)}
            options={productOptions}
          />
        </div>
      </FiltersWrapper>
      <SplitView>
        <div className="split-left">
          <ContentFromFile
            language={languageValue}
            blockchain={chainValue}
            product={productValue}
          />
        </div>
        {filePaths.length === 0 ? (
          <CodeNotFound />
        ) : (
          <div className="split-right">
            <FileList
              options={filePaths}
              value={fileValue}
              onChange={value => setFileValue(value)}
            />
            <div ref={scrollRef} className="scrollable-code">
              <CodeFromFile
                language={languageValue}
                blockchain={chainValue}
                product={productValue}
                file={fileValue}
              />
            </div>
          </div>
        )}
      </SplitView>
    </>
  );
};

export default IntegrationBuilder;
