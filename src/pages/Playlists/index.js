// Playlists.js
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
  useGetAllPlaylistsQuery,
  useDeletePlaylistMutation,
} from '../../redux/services/spotifyApi';
import {
  Error,
  Loader,
  PlaylistModal,
  DeleteConfirmationModal,
} from '../../components'; // Importez DeleteConfirmationModal

const Playlists = () => {
  const {data: playlistsData, isFetching, error} = useGetAllPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleDelete = async () => {
    await deletePlaylist(selectedPlaylist.id);
    setIsDeleteModalOpen(false);
  };

  if (isFetching) return <Loader title="Loading Playlists..." />; // Utilisez le composant Loader
  if (error) return <Error />; // Utilisez le composant Error

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Playlists</h2>
        <button
          onClick={() => {
            setSelectedPlaylist(null);
            setIsCreateModalOpen(true);
          }}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
          Create Playlist
        </button>
      </div>
      {playlistsData?.map(playlist => (
        <div
          key={playlist.id}
          className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
          <Link
            to={`/playlist/${playlist.id}`}
            className="font-bold text-base text-white mr-3">
            {playlist.name}
          </Link>
          <button
            onClick={() => {
              setSelectedPlaylist(playlist);
              setIsCreateModalOpen(true);
            }}
            className="bg-blue-500 text-white p-1 rounded-lg outline-none">
            Edit
          </button>
          <button
            onClick={() => {
              setSelectedPlaylist(playlist);
              setIsDeleteModalOpen(true);
            }}
            className="bg-red-500 text-white p-1 rounded-lg outline-none ml-2">
            Delete
          </button>
        </div>
      ))}
      <PlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        playlist={selectedPlaylist}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        playlist={selectedPlaylist}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Playlists;
