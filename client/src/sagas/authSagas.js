import { createStore } from 'redux';
import { put } from 'redux-saga/effects';
import * as AuthActionCreators from '../actions/authActionCreators';
import * as Api from './../api/http';

const createAuthSaga = apiMethod => {
  const authSaga = function* (action) {
    yield put(AuthActionCreators.authRequest());
    try {
      const {
        payload: { values },
      } = action;
      const {
        data: { data },
      } = yield apiMethod(values);
      yield put(AuthActionCreators.authRequestSuccess(data));
    } catch (err) {
      yield put(AuthActionCreators.authRequestFailed(err));
    }
  };
  return authSaga;
};

export const loginSaga = createAuthSaga(Api.auth.login);
export const signUpSaga = createAuthSaga(Api.auth.signUp);
export const refreshSaga = createAuthSaga(Api.auth.refresh);
