import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingIndicator = () => {
  return (
    <Player
      autoplay
      loop
      style={{ width: '256px', height: '256px' }}
      src="https://assets1.lottiefiles.com/packages/lf20_w6xlywkv.json"
    ></Player>
  );
};

export default LoadingIndicator;
