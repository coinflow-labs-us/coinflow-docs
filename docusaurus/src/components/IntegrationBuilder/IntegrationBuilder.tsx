import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react';
import CodeFromFile from '@site/src/components/CodeFromFile';
import {FiltersWrapper} from '@site/src/components/IntegrationBuilder/Select/styledComponents';
import {SplitView} from '@site/src/components/IntegrationBuilder/styledComponents';
import Select from '@site/src/components/Select';
import FileList from '@site/src/components/IntegrationBuilder/FileList/FileList';
import ContentFromFile from '@site/src/components/ContentFromFile';
import CodeNotFound from '@site/src/components/CodeFromFile/CodeNotFound';
import ContentBlockContext from '@site/src/context/ContentBlockContext';
import {
  CHAIN_OPTIONS,
  CODE_LINE_HEIGHT,
  LANGUAGE_OPTIONS,
  PRODUCT_OPTIONS,
} from '@site/src/utils/constants';

const IntegrationBuilder = () => {
  const scrollRef = useRef(null);

  const [filePaths, setFilePaths] = useState<string[]>([]);

  const {
    activeBlock,
    setActiveBlock,
    activeBlockFile,
    setActiveBlockFile,
    highlight,
    setHighlight,
    isFileLoading,
    languageValue,
    setLanguageValue,
    chainValue,
    setChainValue,
    productValue,
    fileValue,
    setProductValue,
    setFileValue,
    setIsFileLoading,
  } = useContext(ContentBlockContext);

  const loadConfig = useCallback(async () => {
    try {
      const result = await import(
        `@site/src/content/${languageValue}/${chainValue}/${productValue}/config.ts`
      );
      setFilePaths(result.files);
      setFileValue(result.files[0]);
      setActiveBlockFile(undefined);
      setHighlight(undefined);
      setActiveBlock(undefined);
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
    if (!activeBlockFile) return;

    setFileValue(activeBlockFile);
  }, [activeBlockFile]);

  useEffect(() => {
    if (!isFileLoading) handleScroll();
  }, [highlight, isFileLoading]);

  return (
    <>
      <FiltersWrapper>
        <div>
          <Select
            value={LANGUAGE_OPTIONS.find(opt => opt.value === languageValue)}
            onChange={newValue => setLanguageValue(newValue.value)}
            options={LANGUAGE_OPTIONS}
          />
        </div>
        <div>
          <Select
            value={CHAIN_OPTIONS.find(opt => opt.value === chainValue)}
            onChange={newValue => setChainValue(newValue.value)}
            options={CHAIN_OPTIONS}
          />
        </div>
        <div>
          <Select
            value={PRODUCT_OPTIONS.find(opt => opt.value === productValue)}
            onChange={newValue => setProductValue(newValue.value)}
            options={PRODUCT_OPTIONS}
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
              onChange={value => {
                setActiveBlockFile(undefined);
                setHighlight(undefined);
                setFileValue(value);

                if (activeBlock?.filePath === value) {
                  setHighlight(activeBlock.highlight);
                  setActiveBlockFile(value);
                }
              }}
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
