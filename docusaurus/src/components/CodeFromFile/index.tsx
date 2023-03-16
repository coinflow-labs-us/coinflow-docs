import React, {useEffect, useMemo, useState} from 'react';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export type Languages = 'react';
export type Blockchains = 'solana';
export type Product = 'offramp' | 'checkout';

export default function CodeFromFile({language, blockchain, product, file}: {language: Languages; blockchain: Blockchains; product: Product; file: string;}) {
  const { siteConfig } = useDocusaurusContext();
  const [code, setCode] = useState<string>("");

  const filePath = useMemo(() => {
    return `code/examples/${language}/${blockchain}/${product}/${file}`
  }, []);

  const languageExt =  useMemo(() => {
    return 'ts'; // TODO parse file extension
  }, []);

  const url = useMemo(() => {
    return `${siteConfig.baseUrl}${filePath}`;
  }, []);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => setCode(data));
  }, [filePath, siteConfig.baseUrl]);

  return <CodeBlock language={languageExt}>{code}</CodeBlock>;
}
