// @flow

import React from 'react';
import styles from './styles.styl';

class Container extends React.Component {
  static displayName = 'Container';

  render() {
    const { children } = this.props;

    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  }
}

export default Container;
