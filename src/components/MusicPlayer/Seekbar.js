import React from 'react';

import styles from './Seekbar.module.scss';

const Seekbar = ({value, min, max, onInput, setSeekTime, appTime}) => {
  const getTime = time =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className={styles.seekbar}>
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className={styles.button}>
        -
      </button>
      <p className={styles.text}>{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className={styles.input}
      />
      <p className={styles.text}>{max === 0 ? '0:00' : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className={styles.button}>
        +
      </button>
    </div>
  );
};

export default Seekbar;
