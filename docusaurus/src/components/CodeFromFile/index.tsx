import React, {useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type Languages = 'react' | 'vue';
export type Blockchains = 'solana' | 'polygon';
export type Product = 'offramp' | 'checkout';

export default function CodeFromFile({
  language,
  blockchain,
  product,
  file,
}: {
  language: Languages;
  blockchain: Blockchains;
  product: Product;
  file: string;
}) {
  const {siteConfig} = useDocusaurusContext();
  const [code, setCode] = useState<string>('');

  const filePath = useMemo(() => {
    return `code/examples/${language}/${blockchain}/${product}/${file}`;
  }, [language, blockchain, product, file]);

  const languageExt = useMemo(() => {
    return 'ts'; // TODO parse file extension
  }, []);

  const url = useMemo(() => {
    return `${siteConfig.baseUrl}${filePath}`;
  }, [siteConfig, filePath]);

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(data => setCode(data));
  }, [filePath, siteConfig.baseUrl]);

  return (
    <CodeBlock
      className="code-block"
      language={languageExt}
      showLineNumbers
      metastring="{1,4-6,11}"
    >
      {code}
    </CodeBlock>
  );
}
