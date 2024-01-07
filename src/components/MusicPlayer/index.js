import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {nextSong, prevSong, playPause} from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import io from 'socket.io-client';

import styles from './MusicPlayer.module.scss';

const MusicPlayer = () => {
  const {activeSong, currentSongs, currentIndex, isActive, isPlaying} =
    useSelector(state => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  // Ajoutez un état pour le lien partagé
  const [sharedTime, setSharedTime] = useState(0);
  const dispatch = useDispatch();
  const socketRef = useRef();

  // const handleShareTime = useCallback(() => {
  //   socket.emit('shareTime', {time: appTime, song: activeSong.id});
  // }, [appTime, activeSong]);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_HOST);
    socketRef.current.emit('register', 'clement');

    socketRef.current.on('shareTime', musique => {
      console.log(musique.activeSong);
      console.log(musique.time);

      if (!isPlaying) {
        dispatch(playPause(true));
        dispatch(nextSong(musique.currentIndex));
        setSeekTime(musique.time);
      }
    });

    return () => {
      socketRef.current.off('shareTime');
      socketRef.current.close();
    };
  }, [isPlaying, dispatch]);

  const handleShareTime = e => {
    e.preventDefault();

    socketRef.current.emit('shareTime', {
      time: appTime,
      song: activeSong.id,
      activeSong: activeSong,
      currentSongs: currentSongs,
      currentIndex: currentIndex,
      isActive: isActive,
      isPlaying: isPlaying,
    });
  };

  const handlePlayPause = useCallback(() => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  }, [isActive, isPlaying, dispatch]);

  const handleNextSong = useCallback(() => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  }, [shuffle, currentIndex, currentSongs.length, dispatch]);

  const handlePrevSong = useCallback(() => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  }, [shuffle, currentIndex, currentSongs.length, dispatch]);

  const memoizedValue = useMemo(() => handleNextSong, [handleNextSong]);

  return (
    <div className={styles.musicPlayer}>
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      <div className={styles.controlsContainer}>
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={event => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={memoizedValue}
          onTimeUpdate={event => setAppTime(event.target.currentTime)}
          onLoadedData={event => setDuration(event.target.duration)}
        />
      </div>
      <div>
        <button onClick={handleShareTime}>Partager</button>
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={event => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
