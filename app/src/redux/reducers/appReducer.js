import {ADD_FAVOURITE, SET_APP_LOADER} from '../Actions';

const initialState = {
  favCharacters: [],
  isLoading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVOURITE:
      console.log({action});
      return {...state, favCharacters: action.data};

    case SET_APP_LOADER:
      console.log({action});
      return {...state, isLoading: action.data};

    default:
      return state;
  }
};

export default appReducer;
