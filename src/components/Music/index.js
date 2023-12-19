// Music.js
import React from 'react';

import {MusicCard} from '../../components';

const Music = ({music, data}) => {
  //const {data: musicsData} = useGetMusicsByAlbumQuery(album.id);
  return <MusicCard key={music.id} music={music} data={data} />;
};

export default Music;
