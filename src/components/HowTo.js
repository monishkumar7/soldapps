import React from 'react';

const HowTo = () => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-md px-4 py-2 shadow-md">
        <h3 className="text-2xl font-bold my-4">How To</h3>
        <ol className="list-decimal ml-4 mb-4">
          <li>
            Download{' '}
            <a
              href="https://phantom.app/"
              target="_blank"
              rel="noreferrer"
              className="text-purple-700"
            >
              Phantom Wallet
            </a>
          </li>
          <li>Create a Wallet in Phantom</li>
          <li>Go to settings in Phantom and Change network to devnet</li>
          <li>
            Go to{' '}
            <a
              href="https://solfaucet.com/"
              target="_blank"
              rel="noreferrer"
              className="text-purple-700"
            >
              solfaucet.com
            </a>{' '}
            - enter your created wallet address and airdrop 2 sol to your devnet
            address
          </li>
          <li>Click on the button above to connect your wallet</li>
        </ol>
      </div>
    </div>
  );
};

export default HowTo;
