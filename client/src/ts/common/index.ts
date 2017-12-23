import { AuthState } from '../auth/auth-reducers';
import { CommonState } from './common-reducers';

export interface State {
  auth: AuthState;
  common: CommonState;
}
