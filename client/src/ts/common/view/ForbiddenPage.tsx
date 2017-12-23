import * as React from 'react';
import * as Radium from 'radium';

import * as styles from './ForbiddenPageStyles';

export const ForbiddenPage = () => (
  <div style={[styles.common]}>
    Forbidden. You tried to access resource you are not allowed to access.
  </div>
);

export default Radium(ForbiddenPage);
