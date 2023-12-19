// AlbumCard.js
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './AlbumCard.module.scss';

const AlbumCard = ({album, albumImage}) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.albumCard}
      onClick={() => navigate(`/album/${album.id}/musics`)}>
      <img alt="album_img" src={albumImage} />
      <p className={styles.albumName}>{album.title}</p>
    </div>
  );
};

export default AlbumCard;
