// Playlists.js
import React from 'react';
import {useGetAllPlaylistsQuery} from '../../redux/services/spotifyApi';
import {Error, Loader} from '../../components'; // Importez Error et Loader

const Playlists = () => {
  const {data: playlistsData, isFetching, error} = useGetAllPlaylistsQuery();

  if (isFetching) return <Loader title="Loading Playlists..." />; // Utilisez le composant Loader
  if (error) return <Error />; // Utilisez le composant Error

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white text-left mb-10">
        Playlists
      </h1>{' '}
      {/* Le titre de la page s'affiche toujours */}
      {playlistsData?.map(playlist => (
        <div
          key={playlist.id}
          className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
          <h2 className="font-bold text-base text-white mr-3">
            {playlist.name}
          </h2>
          {/* Affichez d'autres informations sur la playlist ici */}
        </div>
      ))}
    </div>
  );
};

export default Playlists;
