// PlaylistModal.js
import React, {useState, useEffect} from 'react';
import {
  useGetAllMusicQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useAddMusicToPlaylistMutation,
  useRemoveMusicFromPlaylistMutation,
  useGetAllMusicsFromPlaylistQuery,
} from '../../redux/services/spotifyApi';

const PlaylistModal = ({isOpen, onClose, playlist}) => {
  const [name, setName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);
  const {data: allMusicData} = useGetAllMusicQuery();
  const {data: playlistMusicsData} = useGetAllMusicsFromPlaylistQuery(
    playlist?.id,
  );
  const [createPlaylist] = useCreatePlaylistMutation();
  const [updatePlaylist] = useUpdatePlaylistMutation();
  const [addMusicToPlaylist] = useAddMusicToPlaylistMutation();
  const [removeMusicFromPlaylist] = useRemoveMusicFromPlaylistMutation();

  useEffect(() => {
    if (playlist) {
      setName(playlist.name);
      setSelectedSongs(playlistMusicsData.map(song => song.id));
    }
  }, [playlist, playlistMusicsData]);

  const handleSave = async () => {
    let playlistId;
    if (playlist) {
      await updatePlaylist({id: playlist.id, name});
      playlistId = playlist.id;
    } else {
      const newPlaylist = await createPlaylist({name});
      playlistId = newPlaylist.id;
    }

    const currentSongIds = playlist
      ? playlistMusicsData.map(song => song.id)
      : [];
    const songsToAdd = selectedSongs.filter(id => !currentSongIds.includes(id));
    const songsToRemove = currentSongIds.filter(
      id => !selectedSongs.includes(id),
    );

    songsToAdd.forEach(songId => {
      addMusicToPlaylist({id: playlistId, music: {id: songId}});
    });

    songsToRemove.forEach(songId => {
      removeMusicFromPlaylist({id: playlistId, music: {id: songId}});
    });

    onClose();
  };

  return isOpen ? (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          ​
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title">
                  {playlist ? 'Edit Playlist' : 'Create Playlist'}
                </h3>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Playlist Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <div className="overflow-y-scroll h-64">
                    {' '}
                    {/* Ajoutez une classe pour le défilement et une hauteur fixe */}
                    {allMusicData?.map(song => (
                      <div key={song.id}>
                        <input
                          type="checkbox"
                          id={song.id}
                          name={song.id}
                          value={song.id}
                          checked={selectedSongs.includes(song.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedSongs([...selectedSongs, song.id]);
                            } else {
                              setSelectedSongs(
                                selectedSongs.filter(id => id !== song.id),
                              );
                            }
                          }}
                        />
                        <label htmlFor={song.id}>{song.title}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}>
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PlaylistModal;
