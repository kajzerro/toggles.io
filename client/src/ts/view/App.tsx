import * as React from 'react';
import * as Radium from 'radium';

import * as styles from './App.styles';

export const UnstyledApp = () => <div style={[styles.common]}>Hello <strong>toggle.io</strong>!</div>;

export const App = Radium(UnstyledApp);
