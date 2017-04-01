// @flow

import React from 'react';
import styles from './styles.styl';

class Grid extends React.Component {
  static displayName = 'Grid';

  render() {
    const { children } = this.props;

    return (
      <div className={styles.grid}>
        {children}
      </div>
    );
  }
}

export default Grid;
