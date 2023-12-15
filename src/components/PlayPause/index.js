// PlayPause.js
import React from 'react';
import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa';
import styles from './PlayPause.module.scss';

const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className={styles.icon} onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className={styles.icon} onClick={handlePlay} />
  );

export default PlayPause;
