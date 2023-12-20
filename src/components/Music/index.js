// Music.js
import React from 'react';

import {MusicCard} from '../../components';

const Music = ({song, data, i}) => {
  //const {data: musicsData} = useGetMusicsByAlbumQuery(album.id);
  return <MusicCard key={song.id} song={song} data={data} i={i} />;
};

export default Music;
