import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import toast, { Toaster } from 'react-hot-toast';

import idl from './idl.json';
import kp from './keypair.json';

import Header from './components/Header';
import Footer from './components/Footer';
import ConnectWallet from './components/ConnectWallet';
import AppList from './components/AppList';
import HowTo from './components/HowTo';

const { SystemProgram } = web3;

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

const programID = new PublicKey(idl.metadata.address);

const network = clusterApiUrl('devnet');

const opts = {
  preflightCommitment: 'processed'
};

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

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
      toast.success('Wallet connected successfully!');
    }
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const createProjectAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        },
        signers: [baseAccount]
      });
      console.log(
        'Created a new BaseAccount with address:',
        baseAccount.publicKey.toString()
      );
      await getProjectList();
    } catch (error) {
      console.log('Error creating BaseAccount account: ', error);
    }
  };

  const getProjectList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      setLoading(true);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log('Got the account', account);
      setProjectList(account.projectList.reverse());
      setLoading(false);
    } catch (error) {
      console.log('Error in getProjectList: ', error);
      setProjectList(null);
      setLoading(false);
    }
  };

  const sendProject = async (values) => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      setLoading(true);
      await program.rpc.addProject(
        values.name,
        values.description,
        values.url,
        {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey
          }
        }
      );

      console.log('Project successfully sent to Solana Program', values);
      setLoading(false);
      toast.success('DApp submitted successfully!');
      await getProjectList();
    } catch (error) {
      console.log('Error in sendProject: ', error);
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    const { solana } = window;
    solana.disconnect();
    setWalletAddress(null);
    console.log('Disconnected Wallet successfully');
    toast('Wallet disconnected successfully!', {
      icon: '👏'
    });
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching project list');
      getProjectList();
    }
  }, [walletAddress]);

  return (
    <div className="bg-purple-50 text-gray-900">
      <div className="max-w-prose mx-auto min-h-screen flex flex-col justify-between">
        <Header
          walletAddress={walletAddress}
          disconnectWallet={() => disconnectWallet()}
        />
        {projectList === null ? (
          <button onClick={createProjectAccount}>
            Initialize DApp Program Acccount
          </button>
        ) : null}

        <Toaster position="top-right" />
        {walletAddress ? (
          <AppList
            projectList={projectList}
            sendProject={(values) => sendProject(values)}
            loading={loading}
          />
        ) : (
          <ConnectWallet handler={() => connectWallet()} />
        )}
        <HowTo />
        <Footer />
      </div>
    </div>
  );
};

export default App;
