import * as React from 'react';
import * as Radium from 'radium';

import * as styles from './LoadingPageStyles';

export const LoadingPage = () => <div style={[styles.common]}>Loading...</div>;

export default Radium(LoadingPage);
