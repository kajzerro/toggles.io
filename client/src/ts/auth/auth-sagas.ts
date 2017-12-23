import { effects } from 'redux-saga';
import { History } from 'history';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import * as authActions from './auth-actions';
import * as commonActions from '../common/common-actions';
import * as cognitoApi from './auth-cognito';

const { all, takeEvery, fork, call, put } = effects;

export interface Dependencies {
  userPool: CognitoUserPool;
  user: CognitoUser;
  cognito: any;
  routerHistory: History;
  uuid: any;
}

export function* signIn(deps: Dependencies, { username, password }: authActions.SignIn) {
  const { cognito, userPool, routerHistory } = deps;
  try {
    const { user, userData } = yield call(cognitoApi.signIn as any, cognito, userPool, username, password);
    deps.user = user;
    yield put(authActions.handleSignInSuccess({ user: userData }));
    if (userData.passwordChangeRequired) {
      yield call(routerHistory.push as any, '/auth/change-password');
    } else {
      yield call(routerHistory.push as any, '/dashboard/projects');
    }
  } catch (e) {
    yield put(authActions.handleSignInFailure({ message: e.message }));
  }
}

export function* setPassword(deps: Dependencies, { password }: authActions.SetPassword) {
  const { cognito, routerHistory, user } = deps;
  try {
    yield call(cognitoApi.changePassword as any, cognito, user, password);
    yield put(authActions.handleSetPasswordSuccess());
    yield call(routerHistory.push as any, '/dashboard/projects');
  } catch (e) {
    yield put(authActions.handleSetPasswordFailure({ message: e.message }));
  }
}

export function* logOut(deps: Dependencies, { fromAll }: authActions.LogOut) {
  const { user, routerHistory, uuid } = deps;
  try {
    yield call(cognitoApi.logOut as any, user, fromAll);
    deps.user = null;
    yield put(authActions.handleLogOutSuccess());
  } catch (e) {
    yield put(authActions.handleLogOutFailure({ message: e.message }));
    yield put(commonActions.addTransientError({ uuid: uuid.v4().toString(), message: e.message }));
  } finally {
    yield call(routerHistory.push as any, '/auth/login');
  }
}

export function* watchSignIn(deps: Dependencies) {
  yield takeEvery(authActions.AuthActionType.SIGN_IN as any, signIn, deps);
}

export function* watchLogOut(deps: Dependencies) {
  yield takeEvery(authActions.AuthActionType.LOG_OUT as any, logOut, deps);
}

export function* watchSetPassword(deps: Dependencies) {
  yield takeEvery(authActions.AuthActionType.SET_PASSWORD as any, setPassword, deps);
}

export default function* authSaga(dependencies: Dependencies) {
  yield all([
    fork(watchSignIn, dependencies),
    fork(watchLogOut, dependencies),
    fork(watchSetPassword, dependencies)
  ]);
}
