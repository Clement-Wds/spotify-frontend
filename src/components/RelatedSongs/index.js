// RelatedSongs.js
import React from 'react';
import SongBar from '../SongBar/index.js';
import Loader from '../Loader/index.js';
import styles from './RelatedSongs.module.scss';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  //const musicData = data[4]?.data;
  const musicData = data || [];

  return (
    <div className={styles.relatedSongs}>
      <h1 className={styles.title}>Related Songs...</h1>
      <div className={styles.songList}>
        {
          //musicData === undefined ||
          musicData.length === 0 ? (
            <Loader title="Related songs are not available..." />
          ) : (
            musicData?.map((song, i) => (
              <SongBar key={`${song.id}-${i}`} i={i} song={song} />
            ))
          )
        }
      </div>
    </div>
  );
};

export default RelatedSongs;
