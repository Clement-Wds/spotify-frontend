// Loader.js
import React from 'react';
import loader from '../../assets/loader.svg';
import styles from './Loader.module.scss';

const Loader = ({title, small}) =>
  small ? (
    <div className={styles.smallLoader}>
      <img src={loader} alt="loader" className={styles.smallImage} />
    </div>
  ) : (
    <div className={styles.fullLoader}>
      <img src={loader} alt="loader" className={styles.fullImage} />
      <h1 className={styles.loaderTitle}>{title || 'Loading...'}</h1>
    </div>
  );

export default Loader;
