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
import FileList from '@site/src/components/IntegrationBuilder/FileList/FileList';

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
  const [fileValue, setFileValue] = useState();

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
            tempora ut veniam voluptatem voluptatibus. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Ad hic ipsam non tempora unde!
            At consequatur, cupiditate excepturi magnam magni nam nostrum
            reiciendis sint. Aperiam et labore quas qui sint. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Accusantium ad atque
            consectetur corporis doloribus enim facere harum illum incidunt
            ipsa, laborum nihil odio odit praesentium quos temporibus totam,
            ullam voluptatibus? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aliquid beatae culpa ducimus earum esse
            exercitationem expedita in, iste laboriosam magni provident quod rem
            sapiente sed vel voluptate voluptatibus. Esse, hic. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Accusamus alias,
            asperiores aspernatur blanditiis, consectetur debitis dignissimos
            facere fugiat ipsa iure maiores numquam officia quam quibusdam, quo
            rem sed tempore? Quibusdam. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Dignissimos dolores et exercitationem id, impedit
            ipsam iure minus molestias mollitia nam nostrum quae qui quod
            reiciendis repellat repudiandae sed voluptas voluptate! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Aspernatur culpa dolor
            ducimus, eos esse veritatis! Eius facere fugiat magni neque nobis
            nostrum quidem quos recusandae, sint tenetur? Explicabo, illum,
            magnam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Ab, cum dicta eos, est, expedita fugiat illo illum magnam molestias
            nostrum odio veniam! Alias atque ex ipsam molestias quisquam tempora
            tempore.
          </p>
        </div>
        <div className="split-right">
          <FileList
            options={['src/App.tsx', 'src/wallet/Wallet.tsx', 'src/index.tsx']}
            value={fileValue}
            onChange={value => setFileValue(value)}
          />
          <CodeFromFile
            language={languageValue}
            blockchain={chainValue}
            product={productValue}
            file={fileValue}
          />
        </div>
      </SplitView>
    </>
  );
};

export default IntegrationBuilder;
