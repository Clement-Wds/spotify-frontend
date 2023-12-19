import React from 'react';
import {useGetAlbumsByArtistQuery} from '../../redux/services/spotifyApi';
import {Loader, Error, Album} from '../../components';
import {useParams} from 'react-router-dom';
const AllAlbumsByArtist = () => {
  const params = useParams();
  const artistId = params.id;

  const {
    data: albumsData,
    isFetching,
    error,
  } = useGetAlbumsByArtistQuery(artistId);
  if (isFetching) return <Loader title="Loading albums..." />;
  //console.log(albumsData[0].id);

  if (error) return <Error />;
  return (
    <div className="flex flex-wrap">
      {albumsData.map(album => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AllAlbumsByArtist;
