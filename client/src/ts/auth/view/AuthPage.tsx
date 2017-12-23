import * as React from 'react';
import { Route, Switch, match } from 'react-router';
import { connect } from 'react-redux';
import NotFoundPage from '../../common/view/NotFoundPage';
import LoadingPage from '../../common/view/LoadingPage';
import { State } from '../../common/index';
import { LogOutState } from '../auth-reducers';
import LoginPage from './LoginPage';
import SetPasswordPage from './SetPasswordPage';

interface StateProps { authorized: boolean; forcePasswordChange: boolean; isLoggingOut: boolean; }
interface OwnProps { match: match<{ url: string }>; }

export type AuthPageProps = StateProps & OwnProps;

export function AuthPage(props: AuthPageProps) {
  const regularRoutes = (
    <Switch>
      <Route exact path={`${props.match.url}/login`}>
        {props.authorized ? <NotFoundPage /> : <LoginPage />}
      </Route>
      <Route exact path={`${props.match.url}/change-password`}>
        {props.authorized ? <SetPasswordPage /> : <NotFoundPage />}
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  );

  return !props.isLoggingOut ? regularRoutes : <LoadingPage />;
}

export default connect<StateProps, {}, OwnProps, State>(
  ({ auth }) => {
    return {
      authorized: auth.user !== null,
      forcePasswordChange: auth.user !== null && auth.user.passwordSetRequired,
      isLoggingOut: auth.logOutState === LogOutState.PENDING
    };
  },
  {}
)(AuthPage);
