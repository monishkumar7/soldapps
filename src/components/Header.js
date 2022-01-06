import React, { useState } from 'react';
import { BsWallet } from 'react-icons/bs';

const Header = ({ walletAddress, disconnectWallet }) => {
  const [showDisconnect, setShowDisconnect] = useState(false);
  const toggleDisconnect = () => {
    setShowDisconnect(!showDisconnect);
  };
  const disconnectButtonHandler = () => {
    disconnectWallet();
    setShowDisconnect(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SolDApps</h1>
        <div
          className="bg-purple-300 p-2 rounded-md flex items-center"
          onClick={() => toggleDisconnect()}
        >
          {walletAddress && (
            <p className="mr-2">
              {walletAddress.substring(0, 4) +
                '....' +
                walletAddress.substring(walletAddress.length - 4)}
            </p>
          )}
          <BsWallet />
        </div>
      </div>
      {walletAddress && showDisconnect && (
        <div className="flex justify-end my-2">
          <button
            className="border-purple-600 text-purple-600 rounded-md p-2 border-2 hover:text-white hover:bg-purple-600"
            onClick={() => disconnectButtonHandler()}
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
