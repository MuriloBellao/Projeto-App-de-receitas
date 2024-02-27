import { AnyAction } from 'redux';
import { NEW_MEAL } from '../actions';

export const INITIAL_STATE = {
  object: '',
};

function mealReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case NEW_MEAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default mealReducer;
