import * as React from 'react';
import * as Radium from 'radium';

import * as styles from './NotFoundPageStyles';

export const NotFoundPage = () => <div style={[styles.common]}>Not found.</div>;

export default Radium(NotFoundPage);
