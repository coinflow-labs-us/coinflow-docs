import type {ReactNode} from 'react';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {map, distinctUntilChanged} from 'rxjs';
import {
  setupWalletSelector,
  VerifiedOwner,
  Wallet,
} from '@near-wallet-selector/core';
import type {WalletSelector, AccountState} from '@near-wallet-selector/core';
import {setupModal} from '@near-wallet-selector/modal-ui';
import type {WalletSelectorModal} from '@near-wallet-selector/modal-ui';
import {setupDefaultWallets} from '@near-wallet-selector/default-wallets';
import {setupNearWallet} from '@near-wallet-selector/near-wallet';
import {setupSender} from '@near-wallet-selector/sender';

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface NearWalletContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const NearWalletContext = React.createContext<NearWalletContextValue | null>(
  null
);

export const NearWalletContextProvider: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: 'testnet',
      debug: true,
      modules: [
        ...(await setupDefaultWallets()),
        setupNearWallet(),
        setupSender(),
      ],
    });
    const _modal = setupModal(_selector, {contractId: 'app.coinflow.testnet'});
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch(err => {
      console.error(err);
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map(state => state.accounts),
        distinctUntilChanged()
      )
      .subscribe(nextAccounts => {
        console.log('Accounts Update', nextAccounts);

        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector]);

  if (!selector || !modal) {
    return null;
  }

  const accountId = accounts.find(account => account.active)?.accountId || null;

  return (
    <NearWalletContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
      }}
    >
      {children}
    </NearWalletContext.Provider>
  );
};

export function useNearWalletSelector() {
  const context = useContext(NearWalletContext);

  if (!context) {
    throw new Error(
      'useWalletSelector must be used within a WalletSelectorContextProvider'
    );
  }

  return context;
}

export function useNearWallet() {
  const {selector, accountId} = useNearWalletSelector();
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    selector.wallet().then(setWallet);
  }, [selector, accountId]);

  const disconnect = useCallback(async () => {
    const wallet = await selector.wallet();
    await wallet.signOut();
  }, [selector]);

  useEffect(() => {
    if (!selector.isSignedIn()) {
      disconnect().catch(err => {
        console.error('Failed to sign out', err);
      });
    }
  }, [disconnect, selector]);

  if (!wallet || !accountId) {
    return null;
  }

  return {
    accountId,
    verifyOwner: wallet.verifyOwner as () => Promise<VerifiedOwner>,
    signAndSendTransaction: wallet.signAndSendTransaction,
    disconnect,
  };
}

export function NearWalletConnect() {
  const {modal} = useNearWalletSelector();
  const nearWallet = useNearWallet();

  const open = useCallback(() => modal.show(), [modal]);

  if (nearWallet) {
    return (
      <div className={'bg-white'}>
        <span>{nearWallet.accountId}</span>
        <button onClick={() => nearWallet.disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className={'bg-white'}>
      <button onClick={open}>Connect</button>
    </div>
  );
}
