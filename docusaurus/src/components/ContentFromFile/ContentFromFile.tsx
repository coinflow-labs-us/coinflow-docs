import {Blockchains, Languages, Product} from '@site/src/types';
import React, {ComponentType, Suspense, useMemo} from 'react';
import Loadable from 'react-loadable';
import NotFound from './NotFound';
import Loading from './Loading';

const ContentFromFile = ({
  language,
  blockchain,
  product,
}: {
  language: Languages;
  blockchain: Blockchains;
  product: Product;
}) => {
  const Content = useMemo(() => {
    let Component: ComponentType = NotFound;

    if (language && blockchain && product) {
      Component = Loadable({
        loader: () =>
          import(
            `@site/src/content/${language}/${blockchain}/${product}/index.mdx`
          ),
        loading: Loading,
      });
    }

    return Component;
  }, [language, blockchain, product]);

  return <Content />;
};

export default ContentFromFile;
