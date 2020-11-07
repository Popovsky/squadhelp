import produce from 'immer';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';
import createReducer from './helpers/createReducer';
import ACTION from "../actions/actionTypes";

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const handlers = {
  [AUTH_ACTION_TYPES.AUTH_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: { user },
      },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),
  [AUTH_ACTION_TYPES.LOGOUT_REQUEST_SUCCESS]: () => ({
    ...initialState,
  }),
  [ACTION.UPDATE_USER_DATA_SUCCESS]: produce((draftState, action) => {
    const {data} = action;
    draftState.isFetching = false;
    draftState.user = data;
  }),
};

const authReducer = createReducer(initialState, handlers);

export default authReducer;
