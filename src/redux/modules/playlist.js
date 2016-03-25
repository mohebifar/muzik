import { put, select } from 'redux-saga/effects';
import { client } from 'helpers/ApiClient';
import { SET_PLAYLIST } from './player';
export const LOAD_ARTIST_ALBUMS = 'playlist/LOAD_ARTIST_ALBUMS';
export const LOAD_ALBUM_SONGS = 'playlist/LOAD_ALBUM_SONGS';
export const LOAD_ALBUM_SONGS_SUCCESS = 'playlist/LOAD_ALBUM_SONGS_SUCCESS';
export const LOAD_ARTIST_ALBUMS_SUCCESS = 'playlist/LOAD_ARTIST_ALBUMS_SUCCESS';
export const LOAD_ARTIST_ALBUMS_FAIL = 'playlist/LOAD_ARTIST_ALBUMS_FAIL';
export const ADD_PLAYLIST = 'playlist/ADD_PLAYLIST';
export const REMOVE_PLAYLIST = 'playlist/REMOVE_PLAYLIST';

const initialState = {
  data: [],
  loading: false,
  loaded: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTIST_ALBUMS:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_ARTIST_ALBUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [...state.data, ...action.data]
      };
    case LOAD_ALBUM_SONGS_SUCCESS:
      const album = state.data.find(album => album.id === action.albumId);
      album.songs = action.data;

      return {
        ...state,
        loading: false,
        loaded: true
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        data: [...state.data, action.playlist]
      };
    case REMOVE_PLAYLIST:
      return {
        ...state,
        data: state.data.filter(playlist => playlist !== action.playlist)
      };
    default:
      return state;
  }
}

export function loadArtistAlbums(artistId) {
  return {
    type: LOAD_ARTIST_ALBUMS,
    artistId
  };
}

export function loadAlbumSongs(albumId) {
  return {
    type: LOAD_ALBUM_SONGS,
    albumId
  };
}

export function isLoaded(store) {
  return store.getState().playlist.loaded;
}

export function *loadArtistAlbumsSaga({artistId}) {
  const response = yield client.getArtistAlbums(artistId);
  yield put({type: LOAD_ARTIST_ALBUMS_SUCCESS, data: response.items});
}

export function *loadAlbumSongsSaga({albumId}) {
  const album = yield select(state => state.playlist.data.find(album => album.id === albumId));
  const loaded = album.songs;

  if (!loaded) {
    const response = yield client.getAlbumSongs(albumId);
    response.items.forEach(item => {
      item.album = album;
    });

    yield put({type: LOAD_ALBUM_SONGS_SUCCESS, data: response.items, albumId});
  }

  const playlist = yield select(state => state.playlist.data.find(album => album.id === albumId));
  yield put({type: SET_PLAYLIST, playlist});
}
