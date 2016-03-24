import { select, put, call } from 'redux-saga/effects';
export const PLAY = 'player/PLAY';
export const PAUSE = 'player/PAUSE';
export const NEXT = 'player/NEXT';
export const PREV = 'player/PREV';
export const SET_SONG = 'player/SET_SONG';
export const TOGGLE_PLAYING_STATE = 'player/TOGGLE_PLAYING_STATE';
export const SHOW_CURRENT_TIME = 'player/SHOW_CURRENT_TIME';
export const SET_CURRENT_PROGRESS = 'player/SHOW_CURRENT_PROGRESS';

const initialState = {
  currentSong: null,
  currentPlaylist: null,
  progress: 0,
  currentTime: 0,
  audio: new Audio('https://p.scdn.co/mp3-preview/575230ca230ab7a79f1b2980e303d7f1612073f3'),
  playingState: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SONG:
      return {
        ...state,
        currentSong: action.song
      };
    case SET_CURRENT_PROGRESS:
      const time = action.progress * state.audio.duration;
      state.audio.currentTime = time;

      return {
        ...state,
        currentTime: state.audio.currentTime
      };
    case TOGGLE_PLAYING_STATE:
      const playingState = !state.playingState;

      if (playingState) {
        state.audio.play();
      } else {
        state.audio.pause();
      }

      return {
        ...state,
        playingState
      };
    case PAUSE:
      state.audio.pause();

      return {
        ...state,
        playingState: false
      };
    case PLAY:
      state.audio.play();

      return {
        ...state,
        playingState: true
      };
    case SHOW_CURRENT_TIME:
      return {
        ...state,
        playingState: true,
        currentTime: action.time,
        //progress: action.time / state.player.duration
      };
    default:
      return state;
  }
}

export function togglePlayingState() {
  return {
    type: TOGGLE_PLAYING_STATE
  };
}

export function setProgress(progress) {
  console.log(progress.ra);
  return {
    type: SET_CURRENT_PROGRESS,
    progress
  };
}

const delayAnimation = function delay(ms) {
  return new Promise(resolve => requestAnimationFrame(resolve))
};

export function *seekSaga() {
  yield call(delayAnimation);

  const playingState = yield select(state => state.player.playingState);
  if (playingState) {
    let time = yield select(state => state.player.audio.currentTime);
    time += 1;
    yield put({type: SHOW_CURRENT_TIME, time});
  }
}
