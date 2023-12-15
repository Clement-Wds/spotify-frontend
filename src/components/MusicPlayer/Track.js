import React from 'react';

import styles from './Track.module.scss';

const Track = ({isPlaying, isActive, activeSong}) => (
  <div className={styles.track}>
    <div
      className={`${isPlaying && isActive ? styles.animate : ''} ${
        styles.imageContainer
      }`}>
      <img
        src={activeSong?.images?.coverart}
        alt="cover art"
        className={styles.image}
      />
    </div>
    <div className={styles.textContainer}>
      <p className={styles.title}>
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className={styles.subtitle}>
        {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
