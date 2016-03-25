import { takeEvery } from 'redux-saga';

import {
  SHOW_CURRENT_TIME,
  PLAY,
  TOGGLE_PLAYING_STATE,
  seekSaga,
  SET_SONG
} from './modules/player';
import {
  LOAD_ARTIST_ALBUMS,
  loadArtistAlbumsSaga,
  LOAD_ALBUM_SONGS,
  loadAlbumSongsSaga
} from './modules/playlist';

export default function *rootSaga() {
  yield [
    takeEvery(SHOW_CURRENT_TIME, seekSaga),
    takeEvery(PLAY, seekSaga),
    takeEvery(SET_SONG, seekSaga),
    takeEvery(TOGGLE_PLAYING_STATE, seekSaga),
    takeEvery(LOAD_ARTIST_ALBUMS, loadArtistAlbumsSaga),
    takeEvery(LOAD_ALBUM_SONGS, loadAlbumSongsSaga)
  ];
};
