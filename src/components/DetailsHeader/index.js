// DetailsHeader.js
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './DetailsHeader.module.scss';

const DetailsHeader = ({artistId, artistData, songData}) => {
  const artist = artistData?.data[0]?.attributes;

  return (
    <div className={styles.detailsHeader}>
      <div className={styles.gradient} />

      <div className={styles.artistInfo}>
        <img
          alt="artist"
          src={
            artistId
              ? artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
              : songData?.images?.coverart
          }
          className={styles.artistImage}
        />
        <div className={styles.artistDetails}>
          <p className={styles.artistName}>
            {artistId ? artist?.name : songData?.title}
          </p>

          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className={styles.artistSubtitle}>{songData?.subtitle}</p>
            </Link>
          )}

          <p className={styles.artistGenre}>
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>

          <p className={styles.artistBirth}>
            {artistId ? artist?.bornOrFormed : ''}
          </p>

          <p className={styles.artistOrigin}>
            {artistId ? artist?.origin : ''}
          </p>
        </div>
      </div>

      <div className={styles.bottomSpace} />
    </div>
  );
};

export default DetailsHeader;
