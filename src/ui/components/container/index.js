// @flow

import React from 'react';
import styles from './styles.styl';

class Container extends React.Component {
  static displayName = 'Container';

  render() {
    const {
      children,
      ...otherProps
    } = this.props;

    return (
      <div className={styles.container} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default Container;
