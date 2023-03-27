import React from 'react';
import clsx from 'clsx';
import {FeatureWrapper} from '@site/src/components/HomepageFeatures/styledComponents';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Pay with major credit cards',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Everyone has credit cards, so allow your users to pay with them. Accept
        payment for goods and services instantly with Coinflow.
      </>
    ),
  },
  {
    title: 'Reduced friction',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Users want to give you money - why make it difficult? With Coinflow,
        user's don't have to jump through hoops or leave your application to pay
        for your products
      </>
    ),
  },
  {
    title: 'Near-zero minimum spend',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Most onramp solutions require a minimum payment, sometimes as high as
        $30 to start using your app. With Coinflow, users can start with as
        little as $0.50 cents to get started.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <FeatureWrapper className={clsx('col col--4')}>
      <div>
        <Svg role="img" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </FeatureWrapper>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
