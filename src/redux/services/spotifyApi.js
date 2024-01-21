// Importer les fonctions utilitaires de redux toolkit
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    // Remplacer par l'URL de base de votre API Express.js
    baseUrl: 'https://46.105.30.149:3001/api',
    prepareHeaders: headers => {
      // Ajouter ici toute logique d'en-tête supplémentaire si nécessaire
      return headers;
    },
  }),
  endpoints: builder => ({
    // Routes pour la musique
    getAllMusic: builder.query({query: () => '/musics'}),
    streamMusicFile: builder.query({query: id => `/music/file/${id}`}),
    getMusic: builder.query({query: id => `/music/${id}`}),
    getMusicByArtist: builder.query({
      query: artistId => `/artist/${artistId}/musics`,
    }),
    getMusicsByAlbum: builder.query({
      query: albumId => `/album/${albumId}/musics`,
    }),

    // Routes pour l'artiste
    getAllArtists: builder.query({query: () => '/artists'}),
    getArtist: builder.query({query: id => `/artist/${id}`}),
    getArtistByMusic: builder.query({
      query: musicId => `/music/${musicId}/artist`,
    }),
    getArtistByAlbum: builder.query({
      query: albumId => `/album/${albumId}/artist`,
    }),

    // Routes pour l'album
    getAllAlbums: builder.query({query: () => '/albums'}),
    getAlbumImage: builder.query({query: id => `/album/image/${id}`}),
    getAlbum: builder.query({query: id => `/album/${id}`}),
    getAlbumsByArtist: builder.query({
      query: artistId => `/artist/${artistId}/albums`,
    }),
    getAlbumByMusic: builder.query({
      query: musicId => `/music/${musicId}/album`,
    }),

    // Routes pour les playlists
    createPlaylist: builder.mutation({
      query: playlist => ({url: '/playlist', method: 'POST', body: playlist}),
    }),
    getAllPlaylists: builder.query({query: () => '/playlists'}),
    getPlaylist: builder.query({query: id => `/playlist/${id}`}),
    updatePlaylist: builder.mutation({
      query: (id, playlist) => ({
        url: `/playlist/${id}`,
        method: 'PUT',
        body: playlist,
      }),
    }),
    deletePlaylist: builder.mutation({
      query: id => ({url: `/playlist/${id}`, method: 'DELETE'}),
    }),
    addMusicToPlaylist: builder.mutation({
      query: (id, music) => ({
        url: `/playlist/${id}/music`,
        method: 'POST',
        body: music,
      }),
    }),
    removeMusicFromPlaylist: builder.mutation({
      query: (id, music) => ({
        url: `/playlist/${id}/music`,
        method: 'DELETE',
        body: music,
      }),
    }),
    getAllMusicsFromPlaylist: builder.query({
      query: id => `/playlist/${id}/musics`,
    }),

    // Recherche
    search: builder.query({query: term => `/search?term=${term}`}),

    //PATCH DEBUG
    getSongsByGenre: builder.query({query: genre => `/genre/${genre}`}),
    getSongDetails: builder.query({query: songId => `/song/${songId}`}),
    getSongRelated: builder.query({query: songId => `/song/${songId}/related`}),
  }),
});

// Exporter les hooks pour chaque requête
export const {
  useGetAllMusicQuery,
  useStreamMusicFileQuery,
  useGetMusicQuery,
  useGetMusicByArtistQuery,
  useGetMusicsByAlbumQuery,
  useGetAllArtistsQuery,
  useGetArtistQuery,
  useGetArtistByMusicQuery,
  useGetArtistByAlbumQuery,
  useGetAllAlbumsQuery,
  useGetAlbumImageQuery,
  useGetAlbumQuery,
  useGetAlbumsByArtistQuery,
  useGetAlbumByMusicQuery,
  useSearchQuery,
  useCreatePlaylistMutation,
  useGetAllPlaylistsQuery,
  useGetPlaylistQuery,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useAddMusicToPlaylistMutation,
  useRemoveMusicFromPlaylistMutation,
  useGetAllMusicsFromPlaylistQuery,

  //PATCH DEBUG
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = spotifyApi;
