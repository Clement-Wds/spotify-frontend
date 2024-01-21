// MusicCardDiscover.js
import React, {useEffect, useState} from 'react';
import {
  useGetArtistByMusicQuery,
  useGetAlbumsByArtistQuery,
} from '../../redux/services/spotifyApi';
import {useDispatch} from 'react-redux';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import styles from './MusicCardDiscover.module.scss';

const MusicCardDiscover = ({song, data, activeSong, isPlaying, i}) => {
  const dispatch = useDispatch();
  const {data: artistData} = useGetArtistByMusicQuery(song.id);
  const {data: albumsData} = useGetAlbumsByArtistQuery(artistData?.id);
  const [songImage, setSongImage] = useState(null);

  const albumId = albumsData && albumsData[0] ? albumsData[0].id : null;

  useEffect(() => {
    if (albumId) {
      fetch(`https://46.105.30.149:3001/api/album/image/${albumId}`)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setSongImage(imageUrl);
        });
    }
  }, [albumId]);

  const handlePlayClick = () => {
    if (song) {
      dispatch(setActiveSong({song, data, i}));
      dispatch(playPause(true));
    }
  };

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
      onClick={handlePlayClick}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={songImage}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-xl font-bold text-white">{song.title}</p>
          <p className="text-base text-gray-300 mt-1">
            {artistData?.name}
          </p>{' '}
          {/* Affichez le nom de l'artiste ici */}
        </div>
      </div>
    </div>
  );
};

export default MusicCardDiscover;
