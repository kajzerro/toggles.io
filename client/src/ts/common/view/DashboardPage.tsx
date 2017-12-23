import * as React from 'react';
import { Route, Switch, Redirect, match } from 'react-router';
import { connect } from 'react-redux';
import ProjectListPage from '../../projects/view/ProjectListPage';
import ProjectDetailPage from '../../projects/view/ProjectDetailPage';
import { State } from '../index';
import NotFoundPage from './NotFoundPage';
import ForbiddenPage from './ForbiddenPage';

interface StateProps { authorized: boolean; forcePasswordChange: boolean; }
interface OwnProps { match: match<{ url: string }>; }

export type DashboardPageProps = StateProps & OwnProps;
export function DashboardPage(props: DashboardPageProps) {
  const url = props.match.url;
  return props.authorized ? renderAuthorizedRoutes(url) : renderUnauthorizedRoutes(props.forcePasswordChange);
}

export function renderAuthorizedRoutes(url: string) {
  return (
    <Switch>
      <Route exact path={`${url}/projects`} component={ProjectListPage} />
      <Route exact path={`${url}/projects/:id`} component={ProjectDetailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export function renderUnauthorizedRoutes(forcePasswordChange: boolean) {
  if (forcePasswordChange) {
    return <Redirect to="/auth/change-password" />;
  } else {
    return <ForbiddenPage />;
  }
}

export default connect<StateProps, {}, {}, State>(
  ({ auth }) => ({
    authorized: auth.user !== null && !auth.user.passwordSetRequired,
    forcePasswordChange: auth.user !== null && auth.user.passwordSetRequired
  }),
  {}
)(DashboardPage);
