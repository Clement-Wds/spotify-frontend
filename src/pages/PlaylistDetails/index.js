// PlaylistDetails.js
import React from 'react';
import {useParams} from 'react-router-dom';
import {
  useGetPlaylistQuery,
  useGetAllMusicsFromPlaylistQuery,
} from '../../redux/services/spotifyApi';
import {Error, Loader, MusicCardDiscover} from '../../components'; // Importez MusicCardDiscover

const PlaylistDetails = () => {
  const {id} = useParams();
  const {
    data: playlistData,
    isFetching: isFetchingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(id);
  const {
    data: playlistMusicsData,
    isFetching: isFetchingMusics,
    error: musicsError,
  } = useGetAllMusicsFromPlaylistQuery(id);

  const isFetching = isFetchingPlaylist || isFetchingMusics;
  const error = playlistError || musicsError;

  if (isFetching) return <Loader title="Loading Playlist..." />; // Utilisez le composant Loader
  if (error) return <Error />; // Utilisez le composant Error

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mb-10">
        {playlistData.name}
      </h2>
      {playlistMusicsData.map(
        (
          song,
          i, // Utilisez playlistMusicsData pour afficher les musiques de la playlist
        ) => (
          <MusicCardDiscover
            key={song.id}
            song={song}
            data={playlistMusicsData}
            i={i}
          />
        ),
      )}
    </div>
  );
};

export default PlaylistDetails;
