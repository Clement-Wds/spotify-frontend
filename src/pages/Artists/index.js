import React from 'react';
import {useGetAllArtistsQuery} from '../../redux/services/spotifyApi';
import {Loader, Error, Artist} from '../../components';

const AllArtists = () => {
  const {data: artistsData = [], isFetching, error} = useGetAllArtistsQuery();
  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error />;

  return (
    <div className="all-artists flex flex-wrap gap-4">
      {artistsData.map(artist => (
        <Artist key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default AllArtists;
