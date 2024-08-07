import React, {useRef, useState} from 'react';
import {
  CoinflowCardTokenResponse,
  CoinflowCardNumberInput,
  CoinflowCvvInput,
} from '@coinflowlabs/react';

function App() {
  const coinflowCardFormRef = useRef<{
    getToken(): Promise<CoinflowCardTokenResponse>;
  }>();
  const [cardFormExp, setCardFormExp] = useState('');
  const [token, setToken] = useState('');

  return (
    <div className="App">
      <div style={{maxHeight: '50px', border: '1px solid black'}}>
        <CoinflowCardNumberInput
          ref={coinflowCardFormRef}
          env="sandbox" // Change to 'prod' for production
          debug={true} // Change to false for production
          css={{
            base: 'font-family: Montserrat, sans-serif; padding: 0 8px; border: 0px; margin: 0; width: 100%; font-size: 13px; line-height: 48px; height: 48px; box-sizing: border-box; -moz-box-sizing: border-box;',
            focus: 'outline: 0;',
            error:
              'box-shadow: 0 0 6px 0 rgba(224, 57, 57, 0.5); border: 1px solid rgba(224, 57, 57, 0.5);',
            cvv: {
              base: 'font-family: Montserrat, sans-serif; padding: 0 8px; border: 0px; margin: 0; width: 100%; font-size: 13px; line-height: 48px; height: 48px; box-sizing: border-box; -moz-box-sizing: border-box;',
              focus: 'outline: 0;',
              error:
                'box-shadow: 0 0 6px 0 rgba(224, 57, 57, 0.5); border: 1px solid rgba(224, 57, 57, 0.5);',
            },
          }}
        />
      </div>
      <input
        placeholder="Expiration"
        value={cardFormExp}
        onChange={e => setCardFormExp(e.target.value)}
        style={{maxHeight: '50px', border: '1px solid black'}}
      />
      <div style={{height: '50px', border: '1px solid black'}}>
        <CoinflowCvvInput />
      </div>
      <button
        id="getToken"
        onClick={() => {
          coinflowCardFormRef.current
            ?.getToken()
            .then(tokenData => setToken(tokenData.token))
            .catch(err => console.error('GET TOKEN ERROR', {err}));
        }}
      >
        Get Token
      </button>
      <br />
      <span>Token: {token}</span>
    </div>
  );
}

export default App;
