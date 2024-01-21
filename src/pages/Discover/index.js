import {useDispatch, useSelector} from 'react-redux';
import {Error, Loader, MusicCardDiscover} from '../../components'; // Importez MusicCardDiscover
import {genres} from '../../assets/constants';
import {selectGenreListId} from '../../redux/features/playerSlice';
import {useGetAllMusicQuery} from '../../redux/services/spotifyApi'; // Importez useGetAllMusicQuery

const Discover = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying, genreListId} = useSelector(
    state => state.player,
  );
  const {data: allMusicData, isFetching, error} = useGetAllMusicQuery(); // Utilisez useGetAllMusicQuery pour récupérer toutes les musiques

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;
  const genreTitle = genres.find(({value}) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={e => {
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'Pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
          {genres.map(genre => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {allMusicData?.map((song, i) => (
          <MusicCardDiscover
            key={song.id}
            song={song}
            data={allMusicData}
            activeSong={activeSong}
            isPlaying={isPlaying}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
