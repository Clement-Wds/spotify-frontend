import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PlayPause from '../PlayPause';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import {useGetAlbumsByArtistQuery} from '../../redux/services/spotifyApi';
import styles from './SongCard.module.scss';

const SongCard = ({song, data, activeSong, isPlaying, i}) => {
  const dispatch = useDispatch();
  const [songImage, setSongImage] = useState(null);
  const {data: albumsData} = useGetAlbumsByArtistQuery(song.id);

  // Assurez-vous que albumsData contient au moins un album
  const albumId = albumsData && albumsData[0] ? albumsData[0].id : null;

  useEffect(() => {
    if (albumId) {
      fetch(`http://localhost:3001/api/album/image/${albumId}`)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setSongImage(imageUrl);
        });
    }
  }, [albumId]);

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
        <img alt="song_img" src={songImage} />
      </div>

      <div className={styles.songInfo}>
        <p className={styles.songTitle}>
          <Link to={song.artists ? `/songs/${song?.key}` : `/around-you`}>
            {song.name}
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
