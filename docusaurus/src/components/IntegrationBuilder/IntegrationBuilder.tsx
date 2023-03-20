import React, {useState} from 'react';
import CodeFromFile, {
  Blockchains,
  Languages,
  Product,
} from '@site/src/components/CodeFromFile';
import Select from 'react-select';

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
      <div
        style={{display: 'flex', flexDirection: 'row', marginBottom: '1rem'}}
      >
        <div style={{marginRight: '1rem'}}>
          <Select
            onChange={newValue => setLanguageValue(newValue.value)}
            options={languageOptions}
          />
        </div>
        <div style={{marginRight: '1rem'}}>
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
      </div>
      <CodeFromFile
        language={languageValue}
        blockchain={chainValue}
        product={productValue}
        file={'src/App.tsx'}
      />
    </>
  );
};

export default IntegrationBuilder;
