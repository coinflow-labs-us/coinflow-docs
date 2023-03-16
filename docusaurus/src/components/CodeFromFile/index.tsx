import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import MyComponentSource from '!!raw-loader!/../../examples/react/solana/offramp/src/App.tsx';

export type Languages = 'react';
export type Blockchains = 'solana';
export type Product = 'offramp' | 'checkout';

export default function CodeFromFile({language, blockchain, product, file}: {language: Languages; blockchain: Blockchains; product: Product; file: string;}) {
  // TODO make this able to load the files dynamically
  return <CodeBlock language="ts">{MyComponentSource}</CodeBlock>;
}
