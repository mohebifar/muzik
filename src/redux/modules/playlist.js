export const ADD_PLAYLIST = 'playlist/ADD_PLAYLIST';
export const REMOVE_PLAYLIST = 'playlist/REMOVE_PLAYLIST';

const initialState = {
  data: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
