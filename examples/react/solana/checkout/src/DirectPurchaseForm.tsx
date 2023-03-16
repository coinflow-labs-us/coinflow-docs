import React from 'react';
import {useWallet} from './wallet/Wallet';
import {Button} from 'antd';

export function HorizontalDivider({className}: {className: string}) {
  return (
    <div
      className={`flex-grow h-1 min-h-1 ${className}`}
      style={{background: 'var(--ring-color)'}}
    />
  );
}

export function DirectPurchaseForm() {
  const {publicKey, disconnect} = useWallet();

  const focusedNft = {
    image:
      'https://opengameart.org/sites/default/files/short_sword_game_item.jpg',
    name: 'Test NFT',
  };

  return (
    <div className={'flex-col w-30 bg-base-1 p-8 drop-shadow-md bg-[#F9F9ED]'}>
      <div className={'flex-col space-y-5 justify-center align-center'}>
        <img
          src={
            'https://shdw-drive.genesysgo.net/Fwa7houxcUtTKGf1egRUVowgax5zzNLFYkPvggLYexeo/logo-no-background.svg'
          }
          alt={'nft'}
          className={'w-60 h-30 rounded-lg bg-[#0093FB] p-4'}
        />
        <img
          src={focusedNft.image}
          alt={'nft'}
          className={'w-60 h-60 rounded-lg'}
        />
      </div>
      <div className={'flex-col'}>
        <SupplyIndicator />
      </div>
      <HorizontalDivider className={'my-8'} />
      <div className="flex-col w-full">
        <HorizontalDivider className={'my-8'} />
        <Total />
      </div>
      <div className={'flex flex-col items-center justify-center self-end'}>
        {publicKey && (
          <Button
            type="primary"
            onClick={disconnect}
            size={'large'}
            style={{background: '#73c2fb'}}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

function Total() {
  return (
    <div className="flex-row items-baseline mb-8">
      <span className="font-xl text-neutral-2 weight-300">Price</span>
      <span className="flex-grow" />
      <span
        className="text-neutral-2 weight-700 flex items-center bg-base-2 rounded-4"
        style={{
          fontSize: 'calc(12px + 1.5vw)',
          paddingRight: '20px',
        }}
      >
        <i className={'text-neutral-2 bx bx-dollar'} />
        {' 1.00'}
      </span>
    </div>
  );
}

function SupplyIndicator() {
  return (
    <>
      <span className="font-md font-bold">Basic Sword</span>
      <br />
      <br />
      <span className="font-md font-medium">
        Damage: 1x
        <br />
        Weight: 1
      </span>
    </>
  );
}
