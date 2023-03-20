import React, {useState} from 'react';
import CodeFromFile, {
  Blockchains,
  Languages,
  Product,
} from '@site/src/components/CodeFromFile';
import {
  FiltersWrapper,
  SplitView,
} from '@site/src/components/IntegrationBuilder/Select/styledComponents';
import Select from '@site/src/components/Select';

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
  const [languageValue, setLanguageValue] = useState<Languages>();
  const [chainValue, setChainValue] = useState<Blockchains>();
  const [productValue, setProductValue] = useState<Product>();

  return (
    <>
      <FiltersWrapper>
        <div>
          <Select
            onChange={newValue => setLanguageValue(newValue.value)}
            options={languageOptions}
          />
        </div>
        <div>
          <Select
            onChange={newValue => setChainValue(newValue.value)}
            options={chainOptions}
          />
        </div>
        <div>
          <Select
            onChange={newValue => setProductValue(newValue.value)}
            options={productOptions}
          />
        </div>
      </FiltersWrapper>
      <SplitView>
        <div className="split-left">
          <h2>Installing</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            at atque, aut doloremque esse eveniet exercitationem illo laboriosam
            magnam molestias necessitatibus obcaecati provident sapiente sequi
            tempora ut veniam voluptatem voluptatibus.
          </p>
        </div>
        <div className="split-right">
          <CodeFromFile
            language={languageValue}
            blockchain={chainValue}
            product={productValue}
            file={'src/App.tsx'}
          />
        </div>
      </SplitView>
    </>
  );
};

export default IntegrationBuilder;
