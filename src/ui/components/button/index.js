// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.styl';

class Button extends React.Component {
  static displayName = 'Button';

  static propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    block: PropTypes.bool,
  };

  static defaultProps = {
    href: '',
    onClick: () => null,
    loading: false,
    disabled: false,
    block: false,
  }

  render() {
    const {
      href,
      onClick,
      value,
      loading,
      disabled,
      block,
      className,
      ...otherProps
    } = this.props;

    const buttonProps = {
      onClick,
      className: classNames(
        styles.button,
        { [styles.isLoading]: loading },
        { [styles.isDisabled]: disabled },
        { [styles.block]: block },
        classNames
      ),
      ...otherProps,
    };

    return (
      href.trim()
        ? <a href={href} {...buttonProps}>{value}</a>
        : <button {...buttonProps}>{ value }</button>
    );
  }
}

export default Button;
