import React, { useState } from 'react';
import { BsWallet } from 'react-icons/bs';
import { AiOutlineDisconnect } from 'react-icons/ai';

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
        <h1 className="text-2xl font-bold">
          SolDApps{' '}
          <span className="text-sm font-normal">(Works only on devnet*)</span>
        </h1>
        <div className="flex items-center justify-between space-x-4">
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
          {walletAddress && showDisconnect && (
            <div className="flex justify-end">
              <button
                className="border-red-400 text-red-600 rounded-md py-1.5 px-4 border-2 hover:text-white hover:bg-red-400 flex justify-between items-center"
                onClick={() => disconnectButtonHandler()}
              >
                <AiOutlineDisconnect className="mr-2 h-6 w-6" />
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
