import React, {useContext, useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Languages, Product, Blockchains} from '@site/src/types';
import ContentBlockContext from '@site/src/context/ContentBlockContext';
import mime from 'mime';
import CodeNotFound from '@site/src/components/CodeFromFile/CodeNotFound';

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
  const [error, setError] = useState(false);

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
    const controller = new AbortController();

    setError(false);

    fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: mime.getType(languageExt) || 'text/javascript',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        setError(true);
      })
      .then(data => setCode(data))
      .catch(() => {})
      .finally(() => {
        setIsFileLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [filePath, siteConfig.baseUrl]);

  return error ? (
    <CodeNotFound />
  ) : (
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
