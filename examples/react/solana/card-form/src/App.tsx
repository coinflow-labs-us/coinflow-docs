import React, {useRef, useState} from 'react';
import {
  CoinflowCardForm,
  CoinflowCardTokenResponse,
  CoinflowEnvs,
} from '@coinflowlabs/react';
import axios from 'axios';

function App() {
  const [height, setHeight] = React.useState<number>(0);
  const ref = useRef<{getToken(): Promise<CoinflowCardTokenResponse>}>();
  const handleHeightChange = (newHeight: string) => {
    setHeight(Number(newHeight));
  };
  const [cvv, setCvv] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const walletPublicKey = '8G9Bua5KvCNtjVgMCuam1iYUhRaBfAMvX295eupRaPZ1'; // replace with the users wallet
  const blockchain = 'solana'; // replace with your blockchain

  const submit = async () => {
    if (!ref.current) return;

    setError('');
    setPaymentId('');

    const {token} = await ref.current.getToken().catch(e => {
      setError(e.message);
      throw e;
    });
    const {
      data: {paymentId},
    } = await axios
      .post<{paymentId: string}>(
        `https://api-sandbox.coinflow.cash/api/checkout/token/${
          process.env.REACT_APP_MERCHANT_ID as string
        }`,
        {
          subtotal: {cents: 100},
          token,
          cvv,
        },
        {
          headers: {
            'x-coinflow-auth-wallet': walletPublicKey,
            'x-coinflow-auth-blockchain': blockchain,
          },
        }
      )
      .catch(e => {
        setError(e.message);
        throw e;
      });
    setPaymentId(paymentId);
  };

  return (
    <div className="App">
      <div
        style={{
          height: height ? height + 'px' : undefined,
        }}
      >
        <CoinflowCardForm
          ref={ref}
          merchantId={process.env.REACT_APP_MERCHANT_ID as string}
          walletPubkey={walletPublicKey} // replace with the users wallet
          env={process.env.REACT_APP_ENV as CoinflowEnvs}
          blockchain={blockchain}
          handleHeightChange={handleHeightChange}
          customCss={{
            input: {
              padding: '5px',
            },
            '.expMonthInput': {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        />
      </div>
      <input
        placeholder={'CVV'}
        value={cvv}
        onChange={e => setCvv(e.currentTarget.value)}
      />
      {error && <div style={{color: 'red'}}>{error}</div>}
      <button onClick={submit}>Get Token</button>
      {paymentId && (
        <div style={{color: 'green'}}>
          Successful payment! Payment ID: {paymentId}
        </div>
      )}
    </div>
  );
}

export default App;
