// Artist.js
import React, {useEffect, useState} from 'react';
import {useGetAlbumsByArtistQuery} from '../../redux/services/spotifyApi';
import {ArtistCard} from '../../components';

const Artist = ({artist}) => {
  const {data: albumsData} = useGetAlbumsByArtistQuery(artist.id);
  const [albumImage, setAlbumImage] = useState(null);
  // Assurez-vous que albumsData contient au moins un album
  const albumId = albumsData && albumsData[0] ? albumsData[0].id : null;
  //A Patch
  useEffect(() => {
    if (albumId) {
      fetch(`http://localhost:3001/api/album/image/${albumId}`)
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setAlbumImage(imageUrl);
        });
    }
  }, [albumId]);
  return (
    <ArtistCard
      key={artist.id}
      artist={artist}
      albumImage={albumImage}
      albums={albumsData}
    />
  );
};

export default Artist;
