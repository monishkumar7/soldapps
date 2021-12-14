import React from 'react';
import { BsWallet } from 'react-icons/bs';

const Header = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">SolDApps</h1>
      <div className="bg-purple-300 p-2 rounded-md">
        <BsWallet />
      </div>
    </div>
  );
};

export default Header;
