import * as React from 'react';
import * as Radium from 'radium';
import { Link } from 'react-router-dom';
import * as styles from './TopBarStyles';

export interface TopBarProps {
  username: string;
  isLoggedIn: boolean;
  isLogoutLoading: boolean;
  onLogout: (logoutFromAllDevices: boolean) => void;
}

export class TopBar extends React.Component<TopBarProps, {}> {
  render() {
    const { isLoggedIn, username } = this.props;
    return (
      <div style={[styles.common]}>
        <Link to="/">Toggles.io</Link>
        {isLoggedIn ? this.authenticatedContents() : this.unauthenticatedContents()}
        <hr />
      </div>
    );
  }

  authenticatedContents = () => {
    return (
      <span>
        {!this.props.isLogoutLoading
          ? <span>{`Logged in as: ${this.props.username}`}</span>
          : <span>Logging out...</span>}
        <button onClick={this.onLogoutFromThis} disabled={this.props.isLogoutLoading}>
          Log out from this device
        </button>
        <button onClick={this.onLogoutFromAll} disabled={this.props.isLogoutLoading}>
          Log out from all devices
        </button>
      </span>
    );
  }

  unauthenticatedContents = () => {
    return <Link to="/auth/login">Sign in</Link>;
  }

  onLogoutFromThis = (e: any) => {
    this.props.onLogout(false);
  }

  onLogoutFromAll = (e: any) => {
    this.props.onLogout(true);
  }
}

export default Radium(TopBar);
