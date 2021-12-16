import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import ConnectWallet from './components/ConnectWallet';
import AppList from './components/AppList';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom Wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with public key',
            response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Phantom wallet not found! Get Phantom wallet');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with public key', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="bg-purple-50 text-gray-900">
      <div className="max-w-prose mx-auto min-h-screen flex flex-col justify-between">
        <Header walletAddress={walletAddress} />
        {walletAddress ? (
          <AppList />
        ) : (
          <ConnectWallet handler={() => connectWallet()} />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
