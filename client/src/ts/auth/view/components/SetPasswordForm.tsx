import * as React from 'react';

export interface SetPasswordFormData {
  password: string;
}

export interface SetPasswordFormProps {
  onSubmit: (data: SetPasswordFormData) => void;
  isLoading: boolean;
  errors?: { password: string, __all: string };
}

export interface SetPasswordFormState { password: string; }

export default class SetPasswordForm extends React.Component<SetPasswordFormProps, SetPasswordFormState> {
  constructor(props: SetPasswordFormProps) {
    super(props);
    this.state = { password: '' };
  }

  render() {
    const disablePassword = this.props.isLoading;
    const disableSubmit = this.props.isLoading || this.state.password === '';

    return (
      <form name="login-form" action="" method="post" autoComplete="off" onSubmit={this.onSubmit}>
        <fieldset>
          <input name="password" type="password" placeholder="new password"
                 value={this.state.password} onChange={this.onPasswordChange} disabled={disablePassword} />
          <button name="submit" type="submit"
                  disabled={disableSubmit}>
            Login
          </button>
        </fieldset>
        <p>{this.props.isLoading ? 'Loading...' : ''}</p>
        <p>{this.props.errors.__all ? this.props.errors.__all : ''}</p>
      </form>
    );
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
  }

  onPasswordChange = (e: any) => {
    this.setState({ password: e.target.value });
  }
}
