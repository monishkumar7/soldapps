import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import ConnectWallet from './components/ConnectWallet';
import AppList from './components/AppList';

const App = () => {
  return (
    <div className="bg-purple-50 text-gray-900">
      <div className="max-w-prose mx-auto min-h-screen flex flex-col justify-between">
        <Header />
        <AppList />
        <Footer />
      </div>
    </div>
  );
};

export default App;
