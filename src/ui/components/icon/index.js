// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import icons from 'src/ui/assets/icons.svg';
import styles from './styles.styl';

class Icon extends React.Component {
  static displayName = 'Icon';

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
  };

  render() {
    const {
      className,
      name,
    } = this.props;

    if (!name) {
      return null;
    }

    return (
      <svg className={classNames(styles.icon, className)}>
        <use xlinkHref={`${icons}#${name}`} />
      </svg>
    );
  }
}

export default Icon;
