import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { BsArrowUpCircleFill } from 'react-icons/bs';

const dapps = [
  {
    name: 'SolDApps',
    url: 'soldapps.xyz',
    description: 'List of Dapps on Solana blockchain',
    category: 'directory',
    votes: '4'
  },
  {
    name: '8pay',
    url: '8pay.network',
    description: 'Accept payments on Solana',
    category: 'defi',
    votes: '3'
  },
  {
    name: 'Phantasia',
    url: 'phantasia.com',
    description: 'Fantasy sports platform',
    category: 'gaming',
    votes: '2'
  },
  {
    name: 'Phantasia',
    url: 'phantasia.com',
    description: 'Fantasy sports platform',
    category: 'gaming',
    votes: '2'
  },
  {
    name: 'Phantasia',
    url: 'phantasia.com',
    description: 'Fantasy sports platform',
    category: 'gaming',
    votes: '2'
  },
  {
    name: 'Phantasia',
    url: 'phantasia.com',
    description: 'Fantasy sports platform',
    category: 'gaming',
    votes: '2'
  }
];

const AppList = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-4">Solana DApps List</h1>
      {dapps.map((dapp, dappIndex) => (
        <div key={dappIndex} className="p-4 rounded my-4 bg-white">
          <div className="flex justify-between mb-2">
            <div className="flex">
              <span className="text-xl font-medium text-gray-700 mr-4">
                {dapp.name}
              </span>
              <a
                href={dapp.url}
                className="text-gray-500 hover:text-purple-600 flex items-center"
              >
                <FiExternalLink className="inline w-3 h-3 mr-1 text-gray-400" />
                {dapp.url}
              </a>
            </div>
            <div className="flex items-center">
              <BsArrowUpCircleFill className="inline w-5 h-5 mr-1 text-gray-700" />
              <span className="text-xl">{dapp.votes}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-700">{dapp.description}</p>
            <span className="px-2 py-1 bg-gray-300 text-xs rounded text-gray-700">
              #{dapp.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppList;
