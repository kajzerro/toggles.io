import { createReducer } from 'reduxsauce';
import {
  CommonActionType,
  CommonAction,
  AddTransientError,
  RemoveTransientError
} from './common-actions';

export interface CommonState {
  transientErrors: Array<{ uuid: string, message: string }>;
}

export const addTransientError = (store: CommonState, action: AddTransientError): CommonState => {
  const { uuid, message } = action;
  return { ...store, transientErrors: store.transientErrors.concat([{ uuid, message }]) };
};

export const removeTransientError = (store: CommonState, action: RemoveTransientError): CommonState => {
  const { uuid } = action;
  return { ...store, transientErrors: store.transientErrors.filter(te => te.uuid !== uuid) };
};

const initialCommonState: CommonState = {
  transientErrors: []
};

const authHandlers: {[key: string]: (store: CommonState, action: CommonAction) => CommonState} = {};
authHandlers[CommonActionType.ADD_TRANSIENT_ERROR] = addTransientError;
authHandlers[CommonActionType.REMOVE_TRANSIENT_ERROR] = removeTransientError;

const commonReducers = createReducer(initialCommonState, authHandlers);

export default commonReducers;
