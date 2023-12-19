import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './MusicCard.module.scss';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import {useDispatch} from 'react-redux';
import {useStreamMusicFileQuery} from '../../redux/services/spotifyApi'; // Assurez-vous d'importer le bon hook

const MusicCard = ({music, data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

  // Utilisez useStreamMusicFileQuery pour obtenir l'URL de la musique
  const {data: songData} = useStreamMusicFileQuery(music.id);

  useEffect(() => {
    if (songData) {
      setSong(songData);
    }
  }, [songData]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const i = music.trackNumber;
  const handlePlayClick = () => {
    if (song) {
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
    }
  };
  console.log(useStreamMusicFileQuery(music.id));

  return (
    <div className={styles.musicCard} onClick={handlePlayClick}>
      <div className={styles.trackInfo}>
        <span className={styles.trackNumber}>{music.trackNumber}</span>
        <div className={styles.titleAndArtist}>
          <p className={styles.musicTitle}>{music.title}</p>
          <p className={styles.musicArtist}>le nom de l'artiste</p>
        </div>
      </div>
      <span className={styles.duration}>{music.duration}</span>
    </div>
  );
};

export default MusicCard;
