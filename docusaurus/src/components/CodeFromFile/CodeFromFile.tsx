import React, {useContext, useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Languages, Product, Blockchains} from '@site/src/types';
import {ContentBlockContext} from '@site/src/context/ContentBlockContext/ContentBlockContext';

const CodeFromFile = ({
  language,
  blockchain,
  product,
  file,
}: {
  language: Languages;
  blockchain: Blockchains;
  product: Product;
  file: string;
}) => {
  const {siteConfig} = useDocusaurusContext();
  const [code, setCode] = useState<string>('');

  const {
    filePath: activeFilePath,
    highlight,
    setIsFileLoading,
  } = useContext(ContentBlockContext);

  const filePath = useMemo(() => {
    return `code/examples/${language}/${blockchain}/${product}/${file}`;
  }, [language, blockchain, product, file]);

  const languageExt = useMemo(() => {
    return file?.slice(file.lastIndexOf('.') + 1);
  }, [file]);

  const url = useMemo(() => {
    return `${siteConfig.baseUrl}${filePath}`;
  }, [siteConfig, filePath]);

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(data => setCode(data))
      .finally(() => {
        setIsFileLoading(false);
      });
  }, [filePath, siteConfig.baseUrl]);

  return (
    <CodeBlock
      className="code-block"
      language={languageExt}
      showLineNumbers
      metastring={activeFilePath === file ? `{${highlight}}` : ''}
    >
      {code}
    </CodeBlock>
  );
};

export default CodeFromFile;
