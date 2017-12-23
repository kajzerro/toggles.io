import * as React from 'react';

export interface LoginFormData { username: string; password: string; }

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  errors?: { username: string, password: string, __all: string };
}

export interface LoginFormState { username: string; password: string; }

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = { username: '', password: '' };
  }

  render() {
    const disableUsername = this.props.isLoading;
    const disablePassword = this.props.isLoading;
    const disableSubmit = this.props.isLoading
      || this.state.username === ''
      || this.state.password === '';

    return (
      <form name="login-form" action="" method="post" autoComplete="off" onSubmit={this.onSubmit}>
        <fieldset>
          <input name="username" type="text" placeholder="username"
                 value={this.state.username} onChange={this.onUsernameChange} disabled={disableUsername} />
          <input name="password" type="password" placeholder="password"
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
    this.props.onSubmit(this.state);
  }

  onUsernameChange = (e: any) => {
    this.setState({ username: e.target.value });
  }

  onPasswordChange = (e: any) => {
    this.setState({ password: e.target.value });
  }
}
