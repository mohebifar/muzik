import { takeEvery } from 'redux-saga';

import { SHOW_CURRENT_TIME, PLAY, TOGGLE_PLAYING_STATE, seekSaga } from './modules/player';

export default function *rootSaga() {
  yield [
    takeEvery(SHOW_CURRENT_TIME, seekSaga),
    takeEvery(PLAY, seekSaga),
    takeEvery(TOGGLE_PLAYING_STATE, seekSaga)
  ];
};
