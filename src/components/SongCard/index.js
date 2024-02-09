import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PlayPause from '../PlayPause';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import {useGetAlbumsByArtistQuery} from '../../redux/services/spotifyApi';

const SongCard = ({song, data, activeSong, isPlaying, i}) => {
  const dispatch = useDispatch();
  const [songImage, setSongImage] = useState(null);
  const {data: albumsData} = useGetAlbumsByArtistQuery(song.id);

  const albumId = albumsData && albumsData[0] ? albumsData[0].id : null;

  useEffect(() => {
    if (albumId) {
      fetch(`https://ceweb-group.fr/api/album/image/${albumId}`)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setSongImage(imageUrl);
        });
    }
  }, [albumId]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={songImage}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={song.artists ? `/songs/${song?.key}` : `/around-you`}>
            <p className="text-xl font-bold text-white">{song.name}</p>
          </Link>
          <p className="text-base text-gray-300 mt-1">{song.subtitle}</p>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default SongCard;
