import React from 'react';

const ConnectWallet = ({ handler }) => {
  return (
    <div className="p-4">
      <p className="text-3xl font-extrabold mb-2">
        Never search for a Solana DApp again.
      </p>
      <p className="text-lg text-gray-600">
        All your favorite Solana DApps in one place.
      </p>
      <button
        className="bg-purple-600 text-white rounded px-8 py-2 font-bold w-full mt-8"
        onClick={handler}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
