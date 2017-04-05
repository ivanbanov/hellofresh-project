// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.styl';

class Grid extends React.Component {
  static displayName = 'Grid';

  static propTypes = {
    fluid: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    fluid: false,
  };

  render() {
    const {
      fluid,
      children,
      className,
      ...otherProps
    } = this.props;

    return (
      <div className={classNames(styles.grid, { fluid }, className)} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default Grid;
