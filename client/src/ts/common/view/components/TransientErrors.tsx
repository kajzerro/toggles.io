import * as React from 'react';
import * as Radium from 'radium';
import * as styles from './TransientErrorsStyles';

export interface TransientErrorsProps {
  errors: Array<{ uuid: string, message: string }>;
  onRemove: (uuid: string) => void;
}

export class TransientErrors extends React.Component<TransientErrorsProps, {}> {
  render() {
    const { errors, onRemove } = this.props;
    return (
      <div style={[styles.common]}>
        <hr />
        <ul>
          {errors.map(err => (
            <li key={err.uuid}>
              <span>{err.message}</span>
              <button onClick={(e: any) => onRemove(err.uuid)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Radium(TransientErrors);
