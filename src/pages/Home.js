import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header/Header';
import MusicPlayer from '../components/MusicPlayer/index';

const Home = () => {
  const {activeSong} = useSelector(state => state.player);

  return (
    <div>
      <Header />
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default Home;
