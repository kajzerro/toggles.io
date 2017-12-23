import 'babel-polyfill';
import * as uuid from 'uuid';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, { effects } from 'redux-saga';
import { createHashHistory, createBrowserHistory } from 'history';
import * as cognitoApi from 'amazon-cognito-identity-js';
import authReducers from './auth/auth-reducers';
import authSaga, { Dependencies as AuthDependencies } from './auth/auth-sagas';
import commonReducers from './common/common-reducers';
import commonSaga, { Dependencies as CommonDependencies } from './common/common-sagas';
import App from './common/view/App';
import { State } from './common';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: () => {}; }
}

const nodeEnv = document.body.getAttribute('data-node-env');
const useDevtools = nodeEnv === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__;

type Dependencies = AuthDependencies & CommonDependencies;
const deps: Dependencies = {
  userPool: new cognitoApi.CognitoUserPool({
    UserPoolId: document.body.getAttribute('data-user-pool-id'),
    ClientId: document.body.getAttribute('data-client-app-id')
  }),
  uuid,
  user: null,
  cognito: cognitoApi,
  routerHistory: nodeEnv === 'development' ? createHashHistory() : createBrowserHistory(),
  delayDuration: 3000
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers<State>({
    common: commonReducers,
    auth: authReducers
  }),
  useDevtools ? window.__REDUX_DEVTOOLS_EXTENSION__() : {},
  applyMiddleware(sagaMiddleware)
);

function* rootSaga(dependencies: Dependencies) {
  yield effects.all([
    effects.fork(authSaga, dependencies),
    effects.fork(commonSaga, dependencies)
  ]);
}

sagaMiddleware.run(rootSaga as () => Iterator<any>, deps);

ReactDOM.render(
  <Provider store={store}><App dependencies={deps} /></Provider>,
  document.getElementById('application-container')
);
