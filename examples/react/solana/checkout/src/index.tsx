import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'boxicons';
import {
  NftStoreConnectionService,
  SolanaNet,
} from '@phantasia/nft-store-interface';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

NftStoreConnectionService.setNet(SolanaNet.DEVNET);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
