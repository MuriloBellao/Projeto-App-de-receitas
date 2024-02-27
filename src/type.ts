import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type RootState = {
  drink: object[],
  meal: object[],
};

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
