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
      </div>
      <HorizontalDivider className={'my-8'} />
      <div className="flex-col w-full">
        {publicKey?.toBase58()}
        <HorizontalDivider className={'my-8'} />
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
