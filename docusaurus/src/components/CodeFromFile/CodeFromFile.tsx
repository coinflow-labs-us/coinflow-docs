import React, {useContext, useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Languages, Product, Blockchains} from '@site/src/types';
import ContentBlockContext from '@site/src/context/ContentBlockContext';
import mime from 'mime';
import CodeNotFound from '@site/src/components/CodeFromFile/CodeNotFound';
import SyncLoader from '../Loading/SyncLoader';

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

  const {activeBlockFile, highlight, isFileLoading, setIsFileLoading} =
    useContext(ContentBlockContext);

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

    setIsFileLoading(true);

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
        if (
          controller.signal.aborted &&
          controller.signal.reason === 'cancel_effect'
        ) {
          return;
        }

        setIsFileLoading(false);
      });

    return () => {
      setIsFileLoading(false);
      controller.abort('cancel_effect');
    };
  }, [filePath, siteConfig.baseUrl]);

  return (
    <>
      {isFileLoading && <SyncLoader />}
      {error && <CodeNotFound />}
      {!isFileLoading && !error && (
        <CodeBlock
          className="code-block"
          language={languageExt}
          showLineNumbers
          metastring={activeBlockFile === file ? `{${highlight}}` : ''}
        >
          {code}
        </CodeBlock>
      )}
    </>
  );
};

export default CodeFromFile;
