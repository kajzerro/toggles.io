import { AnyAction } from 'redux';

export enum CommonActionType {
  ADD_TRANSIENT_ERROR = 'ADD_TRANSIENT_ERROR',
  REMOVE_TRANSIENT_ERROR = 'REMOVE_TRANSIENT_ERROR'
}

export interface CommonAction extends AnyAction {
  type: CommonActionType;
}

export interface AddTransientError extends CommonAction {
  uuid: string;
  message: string;
}

export interface RemoveTransientError extends CommonAction {
  uuid: string;
}

export interface AddTransientErrorParams { uuid: string; message: string; }
export const addTransientError = (params: AddTransientErrorParams): AddTransientError => {
  return { ...params, type: CommonActionType.ADD_TRANSIENT_ERROR };
};

export interface RemoveTransientErrorParams { uuid: string; }
export const removeTransientError = (params: RemoveTransientErrorParams): RemoveTransientError => {
  return { ...params, type: CommonActionType.REMOVE_TRANSIENT_ERROR };
};
