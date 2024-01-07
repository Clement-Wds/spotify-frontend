import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './MusicCard.module.scss';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import {useDispatch} from 'react-redux';

const MusicCard = ({song, data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songurl, setSong] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/music/file/${song.id}`)
      .then(response => response.blob())
      .then(musicBlob => {
        const musicUrl = URL.createObjectURL(musicBlob);
        setSong(musicUrl);
      });
  }, [song.id]);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const i = song.trackNumber;
  const handlePlayClick = () => {
    if (song) {
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
    }
  };
  //Lien créé pour écouter la musique
  //console.log(songurl);
  return (
    <div className={styles.musicCard} onClick={handlePlayClick}>
      <div className={styles.trackInfo}>
        <span className={styles.trackNumber}>{song.trackNumber}</span>
        <div className={styles.titleAndArtist}>
          <p className={styles.musicTitle}>{song.title}</p>
          <p className={styles.musicArtist}>le nom de l'artiste</p>
        </div>
      </div>
      <span className={styles.duration}>{song.duration}</span>
    </div>
  );
};

export default MusicCard;
