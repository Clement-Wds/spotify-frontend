// ArtistCard.js
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './ArtistCard.module.scss';

const ArtistCard = ({artist, albumImage}) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.artistCard}
      onClick={() => navigate(`/artist/${artist.id}/albums`)}>
      <img alt="artist_img" src={albumImage} />
      <p className={styles.artistName}>{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
