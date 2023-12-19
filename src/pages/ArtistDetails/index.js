import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../../components';
import {useGetArtistQuery} from '../../redux/services/spotifyApi';

const ArtistDetails = () => {
  const {id: artistId} = useParams();
  const {activeSong, isPlaying} = useSelector(state => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistQuery(artistId);

  if (isFetchingArtistDetails)
    return <Loader title="Searching artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        //data={Object.values(artistData?.data[0]?.views)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
