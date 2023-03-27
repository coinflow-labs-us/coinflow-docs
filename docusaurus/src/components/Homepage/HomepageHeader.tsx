import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {HomepageBanner} from '@site/src/components/Homepage/styledComponents';
import {HomepageTitle} from '@site/src/components/HomepageFeatures/styledComponents';
import React from 'react';

const HomepageHeader = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <HomepageBanner src="/img/banner.png" />
      <div className="container">
        <HomepageTitle>{siteConfig.title}</HomepageTitle>
        <hr />
        Coinflow is a payment solution that enables Web3 companies to accept
        traditional fiat payment methods such as credit cards and ACH, and
        deliver crypto assets (NFT or fungible tokens) to customers
        frictionlessly. Additionally, Coinflow has an off-ramp that allows
        companies to payout their customers by converting cryptocurrency to USD
        in their traditional bank account. Coinflow’s primary use-case is
        helping games, wallets, and similar Web3 products onboard non-crypto
        native customers with familiar, more traditional payment flows while
        Coinflow handles all of the infrastructure behind the scenes.
      </div>
    </>
  );
};

export default HomepageHeader;
