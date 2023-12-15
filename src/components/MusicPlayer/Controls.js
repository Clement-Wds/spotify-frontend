import React from 'react';
import {MdSkipNext, MdSkipPrevious} from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';

import styles from './Controls.module.scss';

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className={styles.controls}>
    <BsArrowRepeat
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat(prev => !prev)}
      className={styles.hiddenIcon}
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className={styles.cursorPointer}
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <BsFillPauseFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className={styles.cursorPointer}
      />
    ) : (
      <BsFillPlayFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className={styles.cursorPointer}
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        size={30}
        color="#FFF"
        className={styles.cursorPointer}
        onClick={handleNextSong}
      />
    )}
    <BsShuffle
      size={20}
      color={shuffle ? 'red' : 'white'}
      onClick={() => setShuffle(prev => !prev)}
      className={styles.hiddenIcon}
    />
  </div>
);

export default Controls;
