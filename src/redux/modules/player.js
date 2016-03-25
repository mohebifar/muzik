import { select, put, call } from 'redux-saga/effects';
export const PLAY = 'player/PLAY';
export const PAUSE = 'player/PAUSE';
export const NEXT = 'player/NEXT';
export const PREV = 'player/PREV';
export const SET_SONG = 'player/SET_SONG';
export const SEEKED = 'player/SEEKED';
export const SET_PLAYLIST = 'player/SET_PLAYLIST';
export const TOGGLE_PLAYING_STATE = 'player/TOGGLE_PLAYING_STATE';
export const SHOW_CURRENT_TIME = 'player/SHOW_CURRENT_TIME';
export const SET_CURRENT_PROGRESS = 'player/SHOW_CURRENT_PROGRESS';

const initialState = {
  currentSong: null,
  currentPlaylist: [],
  currentMeta: {},
  progress: 0,
  currentTime: 0,
  audio: new Audio(),
  playingState: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SONG:
      state.audio.src = action.song.preview_url;
      state.audio.play();

      return {
        ...state,
        currentSong: action.song,
        currentTime: 0,
        playingState: true
      };
    case SET_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.playlist.songs,
        currentMeta: {
          images: action.playlist.images,
          name: action.playlist.name
        }
      };
    case SEEKED:
      return {
        ...state,
        currentTime: 0,
        playingState: false
      };
    case SET_CURRENT_PROGRESS:
      const time = action.progress * state.audio.duration;
      state.audio.currentTime = time;
    case SHOW_CURRENT_TIME:
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
  return {
    type: SET_CURRENT_PROGRESS,
    progress
  };
}

export function setSong(song) {
  return {
    type: SET_SONG,
    song
  };
}

const delayAnimation = function delay() {
  return new Promise(resolve => requestAnimationFrame(resolve));
};

export function *seekSaga() {
  yield call(delayAnimation);

  const playingState = yield select(state => state.player.playingState);
  if (playingState) {
    yield put({type: SHOW_CURRENT_TIME});
    const currentTime = yield select(state => state.player.audio.currentTime);
    const duration = yield select(state => state.player.audio.duration);

    if (currentTime === duration) {
      yield put({type: SEEKED});
    }
  }
}
