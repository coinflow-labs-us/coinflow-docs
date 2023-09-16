import {Blockchains, Languages, Product} from '@site/src/types';

type Options<T> = Array<{value: T; label: string}>;

export const LANGUAGE_OPTIONS: Options<Languages> = [
  {value: 'react', label: 'React'},
];
export const CHAIN_OPTIONS: Options<Blockchains> = [
  {value: 'solana', label: 'Solana'},
  {value: 'polygon', label: 'Polygon'},
  {value: 'near', label: 'Near'},
  {value: 'eth', label: 'Ethereum'},
];
export const PRODUCT_OPTIONS: Options<Product> = [
  {value: 'checkout', label: 'Checkout'},
  {value: 'withdraw', label: 'Withdraw'},
  {value: 'card-form', label: 'Card Form'},
];

export const GITHUB_EXAMPLES_LINK =
  'https://github.com/coinflow-labs-us/coinflow-docs/blob/main/examples/';

export const CODE_LINE_HEIGHT = 22.04;
