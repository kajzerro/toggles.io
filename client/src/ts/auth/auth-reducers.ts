import { createReducer } from 'reduxsauce';
import {
  AuthActionType,
  AuthAction,
  SignIn,
  HandleSignInFailure,
  HandleSignInSuccess,
  LogOut,
  HandleLogOutFailure,
  HandleLogOutSuccess,
  SetPassword,
  HandleSetPasswordFailure,
  HandleSetPasswordSuccess
} from './auth-actions';

export interface User {
  username: string;
  email: string;
  fullName: string;
  passwordSetRequired: boolean;
}

export enum SignInState { PENDING, ERROR }
export enum SetPasswordState { PENDING, ERROR }
export enum LogOutState { PENDING, ERROR }

export interface AuthState {
  signInState: SignInState;
  signInErrorMessage: string;
  logOutState: LogOutState;
  logOutErrorMessage: string;
  setPasswordState: SetPasswordState;
  setPasswordErrorMessage: string;
  user: User;
}

export const signIn = (store: AuthState, action: SignIn): AuthState => {
  return { ...store, signInState: SignInState.PENDING, signInErrorMessage: null, user: null };
};

export const handleSignInFailure = (store: AuthState, action: HandleSignInFailure): AuthState => {
  return { ...store, signInErrorMessage: action.message, signInState: SignInState.ERROR, user: null };
};

export const handleSignInSuccess = (store: AuthState, action: HandleSignInSuccess): AuthState => {
  return { ...store, user: action.user, signInErrorMessage: null, signInState: null };
};

export const logOut = (store: AuthState, action: LogOut): AuthState => {
  return { ...store, logOutState: LogOutState.PENDING, logOutErrorMessage: null };
};

export const handleLogOutFailure = (store: AuthState, action: HandleLogOutFailure): AuthState => {
  return { ...store, logOutState: null, logOutErrorMessage: action.message, user: null };
};

export const handleLogOutSuccess = (store: AuthState, action: HandleSignInSuccess): AuthState => {
  return { ...store, logOutState: null, logOutErrorMessage: null, user: null };
};

export const setPassword = (store: AuthState, action: SetPassword): AuthState => {
  return { ...store, setPasswordState: SetPasswordState.PENDING, setPasswordErrorMessage: null };
};

export const handleSetPasswordFailure = (store: AuthState, action: HandleSetPasswordFailure): AuthState => {
  return { ...store, setPasswordState: SetPasswordState.ERROR, setPasswordErrorMessage: action.message };
};

export const handleSetPasswordSuccess = (store: AuthState, action: HandleSetPasswordSuccess): AuthState => {
  return {
    ...store,
    user: { ...store.user, passwordSetRequired: false },
    setPasswordState: null,
    setPasswordErrorMessage: null
  };
};

const initialAuthState: AuthState = {
  signInState: null,
  signInErrorMessage: null,
  logOutState: null,
  logOutErrorMessage: null,
  setPasswordState: null,
  setPasswordErrorMessage: null,
  user: null
};

const authHandlers: {[key: string]: (store: AuthState, action: AuthAction) => AuthState} = {};
authHandlers[AuthActionType.SIGN_IN] = signIn;
authHandlers[AuthActionType.HANDLE_SIGN_IN_FAILURE] = handleSignInFailure;
authHandlers[AuthActionType.HANDLE_SIGN_IN_SUCCESS] = handleSignInSuccess;
authHandlers[AuthActionType.LOG_OUT] = logOut;
authHandlers[AuthActionType.HANDLE_LOG_OUT_FAILURE] = handleLogOutFailure;
authHandlers[AuthActionType.HANDLE_LOG_OUT_SUCCESS] = handleLogOutSuccess;
authHandlers[AuthActionType.SET_PASSWORD] = setPassword;
authHandlers[AuthActionType.HANDLE_SET_PASSWORD_FAILURE] = handleSetPasswordFailure;
authHandlers[AuthActionType.HANDLE_SET_PASSWORD_SUCCESS] = handleSetPasswordSuccess;

const authReducers = createReducer(initialAuthState, authHandlers);

export default authReducers;
