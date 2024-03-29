import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import './App.scss';

import {Searchbar, Sidebar, MusicPlayer} from './components';
import {
  ArtistDetails,
  Discover,
  Search,
  SongDetails,
  Artists,
  AlbumsByArtist,
  MusicsByAlbum,
  Playlists,
  PlaylistDetails,
} from './pages';

const App = () => {
  const {activeSong} = useSelector(state => state.player);
  //console.log(activeSong);
  //console.log(useSelector(state => state.player));
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artist/:id/albums" element={<AlbumsByArtist />} />
              <Route path="/album/:id/musics" element={<MusicsByAlbum />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit"></div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
