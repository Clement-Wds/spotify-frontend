import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Error, Loader, SongCard} from '../../components';
import {useSearchQuery} from '../../redux/services/spotifyApi'; // Importer le hook de votre API

const Search = () => {
  const {searchTerm} = useParams();
  const {activeSong, isPlaying} = useSelector(state => state.player);
  const {data, isFetching, error} = useSearchQuery(searchTerm); // Utiliser le hook de votre API

  const songs = data?.tracks?.hits?.map(song => song.track);

  if (isFetching) return <Loader title="Searching ..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            i={i}
            song={song}
            data={data}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
