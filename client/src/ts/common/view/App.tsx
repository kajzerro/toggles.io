import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { History } from 'history';
import AuthPage from '../../auth/view/AuthPage';
import { State } from '../index';
import * as authActions from '../../auth/auth-actions';
import * as commonActions from '../../common/common-actions';
import { LogOutState } from '../../auth/auth-reducers';
import DashboardPage from './DashboardPage';
import NotFoundPage from './NotFoundPage';
import TopBar from './components/TopBar';
import TransientErrors from './components/TransientErrors';

interface OwnAppProps { dependencies: { routerHistory: History }; }

interface DispatchAppProps { onLogout: (fromAllDevices: boolean) => void; onRemoveError: (uuid: string) => void; }

interface StateAppProps {
  authorized: boolean;
  username: string;
  errors: Array<{ uuid: string, message: string }>;
  isLogoutLoading: boolean;
}

export type AppProps = OwnAppProps & StateAppProps & DispatchAppProps;
export function App(props: AppProps) {
  return (
    <Router history={props.dependencies.routerHistory}>
      <div>
        <TopBar isLoggedIn={props.authorized} onLogout={props.onLogout} username={props.username}
                isLogoutLoading={props.isLogoutLoading} />
        <Switch>
          <Route exact path="/">
            {props.authorized
              ? <Redirect to="/dashboard/projects" />
              : <Redirect to="/auth/login" />}
          </Route>
          <Route path="/auth" component={AuthPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <TransientErrors errors={props.errors} onRemove={props.onRemoveError} />
      </div>
    </Router>
  );
}

export default connect<StateAppProps, DispatchAppProps, OwnAppProps, State>(
  ({ auth, common }) => ({
    authorized: auth.user !== null,
    username: auth.user === null ? null : auth.user.username,
    errors: common.transientErrors,
    isLogoutLoading: auth.logOutState === LogOutState.PENDING
  }),
  (dispatch, ownProps) => ({
    onLogout: (fromAll: boolean) => dispatch(authActions.logOut({ fromAll })),
    onRemoveError: (uuid: string) => dispatch(commonActions.removeTransientError({ uuid }))
  })
)(App);
