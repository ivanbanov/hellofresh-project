// @flow

import React, { PropTypes } from 'react';
import Col from 'src/ui/components/col';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import styles from './styles.styl';

type State = {
  isValid: boolean,
};

class Input extends React.Component {
  static displayName = 'Input';

  static propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    validation: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.func),
    ]),
  };

  static defaultProps = {
    type: 'text',
    required: false,
    onChange: () => null,
  };

  state: State = {
    isValid: true,
  };

  validations: Array<Function> = [];

  _validation: Function;
  _onChange: Function;

  constructor(props: Object) {
    super(props);

    const {
      required,
      validation,
    } = this.props;

    if (required) {
      this.validations.push(value => !isEmpty(value));
    }

    if (typeof validation === 'function') {
      this.validations.push(validation);
    }

    this._validation = this._validation.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _validation(value?: string): boolean {
    const isValid = this.validations.every(fn => fn(value));

    this.setState({ isValid });

    return isValid;
  }

  _onChange(event: Event): void {
    const { onChange } = this.props;

    this.setState({ isValid: true });
    onChange(event);
  }

  render() {
    const {
      type,
      placeholder,
      value,
      name,
    } = this.props;

    const { isValid } = this.state;

    return (
      <div className={classNames({ [styles.error]: !isValid })}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          className={styles.input}
          onBlur={event => this._validation(event.target.value)}
          onChange={this._onChange}
        />

        {
          !isValid &&
          <Col gutter={{ top: 'small' }} className={styles.errorMessage}>
            Invalid field
          </Col>
        }
      </div>
    );
  }
}

export default Input;
