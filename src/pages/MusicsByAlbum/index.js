import React from 'react';
import {useGetMusicsByAlbumQuery} from '../../redux/services/spotifyApi';
import {Loader, Error, Music} from '../../components';
import {useParams} from 'react-router-dom';
const AllMusicsByAlbum = () => {
  const params = useParams();
  const albumId = params.id;

  const {
    data: musicsData,
    isFetching,
    error,
  } = useGetMusicsByAlbumQuery(albumId);
  if (isFetching) return <Loader title="Loading albums..." />;
  //console.log(albumsData[0].id);

  if (error) return <Error />;
  return (
    <div className="flex flex-col gap-4">
      {musicsData.map((song, i) => (
        <Music key={song.id} song={song} data={musicsData} i={i} />
      ))}
    </div>
  );
};

export default AllMusicsByAlbum;
