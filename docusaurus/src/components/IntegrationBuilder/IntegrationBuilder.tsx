import React, {useState, lazy, Suspense} from 'react';
import CodeFromFile from '@site/src/components/CodeFromFile';
import {Blockchains, Languages, Product} from '@site/src/types';
import {
  FiltersWrapper,
  SplitView,
} from '@site/src/components/IntegrationBuilder/Select/styledComponents';
import Select from '@site/src/components/Select';
import FileList from '@site/src/components/IntegrationBuilder/FileList/FileList';
import ContentFromFile from '@site/src/components/ContentFromFile';

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
  const [languageValue, setLanguageValue] = useState<Languages>(
    languageOptions[0].value
  );
  const [chainValue, setChainValue] = useState<Blockchains>(
    chainOptions[0].value
  );
  const [productValue, setProductValue] = useState<Product>(
    productOptions[0].value
  );
  const [fileValue, setFileValue] = useState();

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
        <div className="split-right">
          <FileList
            options={['src/App.tsx', 'src/wallet/Wallet.tsx', 'src/index.tsx']}
            value={fileValue}
            onChange={value => setFileValue(value)}
          />
          <div className="scrollable-code">
            <CodeFromFile
              language={languageValue}
              blockchain={chainValue}
              product={productValue}
              file={fileValue}
            />
          </div>
        </div>
      </SplitView>
    </>
  );
};

export default IntegrationBuilder;
