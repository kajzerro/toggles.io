import * as React from 'react';
import * as Radium from 'radium';
import { connect } from 'react-redux';
import { State } from '../../common/index';
import * as authActions from '../auth-actions';
import { SetPasswordState } from '../auth-reducers';
import * as styles from './SetPasswordPageStyles';
import SetPasswordForm, { SetPasswordFormData } from './components/SetPasswordForm';

export interface SetPasswordPageStatePops {
  setPasswordIsLoading: boolean;
  setPasswordError: string;
}

export interface SetPasswordPageDispatchProps { onSetPassword: (data: SetPasswordFormData) => void; }

export type SetPasswordPageProps = SetPasswordPageDispatchProps & SetPasswordPageStatePops;

export const ChangePasswordPage = (props: SetPasswordPageProps) => {
  const { onSetPassword, setPasswordIsLoading, setPasswordError } = props;
  const errors = {
    password: null as string,
    __all: setPasswordError
  };

  return (
    <div style={[styles.common]}>
      <SetPasswordForm onSubmit={onSetPassword} isLoading={setPasswordIsLoading} errors={errors} />
    </div>
  );
};

export default connect<SetPasswordPageStatePops, SetPasswordPageDispatchProps, {}, State>(
  ({ auth }) => ({
    setPasswordIsLoading: auth.setPasswordState === SetPasswordState.PENDING,
    setPasswordError: auth.setPasswordErrorMessage
  }),
  (dispatch, ownProps) => ({
    onSetPassword: (data) => dispatch(authActions.setPassword(data))
  })
)(Radium(ChangePasswordPage));
