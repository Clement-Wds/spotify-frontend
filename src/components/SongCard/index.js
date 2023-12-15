// SongCard.js
import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PlayPause from '../PlayPause';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import styles from './SongCard.module.scss';

const SongCard = ({song, data, activeSong, isPlaying, i}) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  return (
    <div className={styles.songCard}>
      <div
        className={`${styles.songImageContainer} ${
          activeSong?.title === song.title ? styles.activeSong : ''
        }`}>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
        <img
          alt="song_img"
          src={song.artists ? song.images?.coverart : song?.hub?.image}
        />
      </div>

      <div className={styles.songInfo}>
        <p className={styles.songTitle}>
          <Link to={song.artists ? `/songs/${song?.key}` : `/around-you`}>
            {song.title}
          </Link>
        </p>
        <p className={styles.songSubtitle}>
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : '/top-artists'
            }>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
