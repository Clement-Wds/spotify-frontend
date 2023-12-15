// ArtistCard.js
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './ArtistCard.module.scss';

const ArtistCard = ({track}) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.artistCard}
      onClick={() =>
        navigate(
          track.artists
            ? `/artists/${track?.artists[0].adamid}`
            : '/top-artists',
        )
      }>
      <img
        alt="song_img"
        src={track?.artists ? track?.images?.coverart : track?.hub?.image}
      />
      <p className={styles.trackSubtitle}>
        {track ? (
          track?.subtitle
        ) : (
          <Link to={`/top-charts`}>{track?.subtitle}</Link>
        )}
      </p>
    </div>
  );
};

export default ArtistCard;
