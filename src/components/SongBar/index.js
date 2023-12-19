/* eslint-disable no-nested-ternary */
import React from 'react';
import {Link} from 'react-router-dom';

import PlayPause from '../PlayPause';

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  data,
}) => {
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork?.url
            .replace('{w}', '125')
            .replace('{h}', '125')}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId && (
            <Link to={`/top-charts`}>
              <p className="text-xl font-bold text-white">
                {song?.attributes?.name}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-300 mt-1">
            {/* {song?.attributes?.albumName : song?.subtitle} */}
            {song?.attributes?.albumName
              ? song.attributes.albumName
              : song?.attributes?.name}
          </p>
        </div>
      </div>
      {/* {!artistId
          ? (
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, i)}
            />
          )
          : null} */}
    </div>
  );
};

export default SongBar;
