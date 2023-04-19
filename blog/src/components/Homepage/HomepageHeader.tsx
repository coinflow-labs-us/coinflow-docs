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
        Coinflow is the payment stack for Web3 companies. Coinflow lets
        companies accept traditional fiat payment methods such as credit cards
        and ACH, and deliver crypto assets (NFT or fungible tokens) to customers
        frictionlessly. Additionally, Coinflow has an off-ramp that lets
        companies payout to customers’s traditional bank accounts.
        <br />
        <br />
        Coinflow is used by games/gaming studios, wallets, and other Web3
        products onboarding non-crypto native customers. We let you offer
        traditional payment flows by handling all the smart contract
        communication infrastructure for you.
      </div>
    </>
  );
};

export default HomepageHeader;
