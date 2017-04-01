// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.styl';

class Grid extends React.Component {
  static displayName = 'Grid';

  static propTypes = {
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    fluid: false,
  };

  render() {
    const {
      fluid,
      children,
    } = this.props;

    return (
      <div className={classNames(styles.grid, { fluid })}>
        {children}
      </div>
    );
  }
}

export default Grid;
