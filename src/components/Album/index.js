// Album.js
import React, {useEffect, useState} from 'react';
import {useGetMusicsByAlbumQuery} from '../../redux/services/spotifyApi';
import {AlbumCard} from '../../components';

const Album = ({album}) => {
  const {data: musicsData} = useGetMusicsByAlbumQuery(album.id);

  const [albumImage, setAlbumImage] = useState(null);

  //A Patch
  useEffect(() => {
    fetch(`http://46.105.30.149:3001/api/album/image/${album.id}`)
      .then(response => response.blob())
      .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        setAlbumImage(imageUrl);
      });
  }, [album.id]);
  return (
    <AlbumCard
      key={album.id}
      album={album}
      albumImage={albumImage}
      musics={musicsData}
    />
  );
};

export default Album;
