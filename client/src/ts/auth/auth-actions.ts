import { AnyAction } from 'redux';
import { User } from './auth-reducers';

export enum AuthActionType {
  SIGN_IN = 'SIGN_IN',
  HANDLE_SIGN_IN_FAILURE = 'HANDLE_SIGN_IN_FALURE',
  HANDLE_SIGN_IN_SUCCESS = 'HANDLE_SIGN_IN_SUCCESS',
  LOG_OUT = 'LOG_OUT',
  HANDLE_LOG_OUT_SUCCESS = 'HANDLE_LOG_OUT_SUCCESS',
  HANDLE_LOG_OUT_FAILURE = 'HANDLE_LOG_OUT_FAILURE',
  SET_PASSWORD = 'SET_PASSWORD',
  HANDLE_SET_PASSWORD_FAILURE = 'HANDLE_SET_PASSWORD_FALURE',
  HANDLE_SET_PASSWORD_SUCCESS = 'HANDLE_SET_PASSWORD_SUCCESS'
}

export interface AuthAction extends AnyAction {
  type: AuthActionType;
}

export interface SignIn extends AuthAction {
  username: string;
  password: string;
}

export interface HandleSignInFailure extends AuthAction {
  message: string;
}

export interface HandleSignInSuccess extends AuthAction {
  user: User;
}

export interface LogOut extends AuthAction {
  fromAll: boolean;
}

export interface HandleLogOutFailure extends AuthAction {
  message: string;
}

export interface HandleLogOutSuccess extends AuthAction {}

export interface SetPassword extends AuthAction {
  password: string;
}

export interface HandleSetPasswordFailure extends AuthAction {
  message: string;
}

export interface HandleSetPasswordSuccess extends AuthAction {}

export interface SignInParams { username: string; password: string; }
export const signIn = (params: SignInParams): SignIn => {
  return { ...params, type: AuthActionType.SIGN_IN };
};

export interface HandleSignInFailureParams { message: string; }
export const handleSignInFailure = (params: HandleSignInFailureParams): HandleSignInFailure => {
  return { ...params, type: AuthActionType.HANDLE_SIGN_IN_FAILURE };
};

export interface HandleSignInSuccessParams { user: User; }
export const handleSignInSuccess = (params: HandleSignInSuccessParams): HandleSignInSuccess => {
  return { ...params, type: AuthActionType.HANDLE_SIGN_IN_SUCCESS };
};

export interface SetPasswordParams {
  password: string;
}
export const setPassword = (params: SetPasswordParams): SetPassword => {
  return { ...params, type: AuthActionType.SET_PASSWORD };
};

export interface HandleSetPasswordFailureParams { message: string; }
export const handleSetPasswordFailure = (params: HandleSetPasswordFailureParams): HandleSetPasswordFailure => {
  return { ...params, type: AuthActionType.HANDLE_SET_PASSWORD_FAILURE };
};

export const handleSetPasswordSuccess = (): HandleSetPasswordSuccess => {
  return { type: AuthActionType.HANDLE_SET_PASSWORD_SUCCESS };
};

export interface LogOutParams { fromAll: boolean; }
export const logOut = (params: LogOutParams): LogOut => {
  return { ...params, type: AuthActionType.LOG_OUT };
};

export interface HandleLogOutFailureParams { message: string; }
export const handleLogOutFailure = (params: HandleLogOutFailureParams): HandleLogOutFailure => {
  return { ...params, type: AuthActionType.HANDLE_LOG_OUT_FAILURE };
};

export const handleLogOutSuccess = () => {
  return { type: AuthActionType.HANDLE_LOG_OUT_SUCCESS };
};
