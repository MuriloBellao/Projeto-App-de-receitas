import { AnyAction } from 'redux';
import { NEW_ISDRINK } from '../actions';

export const INITIAL_STATE = {
  object: {
    isDrink: false,
  },
};

function drinkReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case NEW_ISDRINK:
      console.log(action.payload);
      return { ...state.object, isDrink: action.payload };
    default:
      return state;
  }
}

export default drinkReducer;
