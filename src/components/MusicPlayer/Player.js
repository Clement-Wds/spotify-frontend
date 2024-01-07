import React, {useRef, useEffect} from 'react';
import {useStreamMusicFileQuery} from '../../redux/services/spotifyApi';
import styles from './Player.module.scss';

const Player = React.memo(
  ({
    activeSong,
    isPlaying,
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat,
  }) => {
    const ref = useRef(null);

    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }

    useEffect(() => {
      ref.current.volume = volume;
    }, [volume]);
    useEffect(() => {
      ref.current.currentTime = seekTime;
    }, [seekTime]);

    // Utiliser l'ID de la chanson active dans l'URL
    const songUrl = `http://localhost:3001/api/music/file/${activeSong.id}`;

    return (
      <audio
        src={songUrl}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
        className={styles.player}
      />
    );
  },
);

export default Player;
