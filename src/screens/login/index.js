// @flow

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Col from 'src/ui/components/col';
import Input from 'src/ui/components/input';
import Button from 'src/ui/components/button';
import imgLogo from 'src/ui/assets/images/hellofresh-logo-2.png';
import isEmail from 'src/utils/validators/is-email';
import { login } from 'src/actions/auth';
import classNames from 'classnames';
import api from 'src/api';
import styles from './styles.styl';

type State = {
  error: ?string,
  isLogging: boolean
};

class LoginScreen extends React.Component {
  static displayName = 'LoginScreen';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  state: State = {
    error: null,
    isLogging: false,
  };

  _onSubmit: Function;

  constructor(props: Object) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  async _onSubmit(event: Object): Promise<*> {
    event.preventDefault();

    const {
      history,
      dispatch,
    } = this.props;
    const email: string = event.target.email.value;
    const password: string = event.target.password.value;

    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      dispatch(login(user, token));

      history.push('/recipes');
    } catch (e) {
      this.setState({
        error: e.response.data.message,
        isLogging: false,
      });
    }
  }

  _renderForm(): React$Element<*> {
    const {
      error,
      isLogging,
    } = this.state;

    return (
      <form onSubmit={this._onSubmit}>
        {
          error &&
          <Col
            gutter={{ bottom: 'medium' }}
            className={classNames(styles.formError, 'text-center')}
          >
            {error}
          </Col>
        }
        <Col>
          <Col gutter={{ bottom: 'small' }}>
            <label>Email</label>
          </Col>
          <Col>
            <Input
              name="email"
              placeholder="user@hellofresh.com"
              validation={isEmail}
              required
            />
          </Col>
        </Col>

        <Col gutter={{ top: 'medium' }}>
          <Col gutter={{ bottom: 'small' }}>
            <label>Password</label>
          </Col>
          <Col>
            <Input
              name="password"
              type="password"
              required
            />
          </Col>
        </Col>

        <Col gutter={{ top: 'large' }}>
          <Button
            loading={isLogging}
            disabled={isLogging}
            value="Login"
            block
          />
        </Col>
      </form>
    );
  }

  render() {
    return (
      <div className={styles.login}>
        <Helmet>
          <title>Login 🔑</title>
        </Helmet>

        <Col
          size={{ small: 12, medium: 8, large: 5 }}
          gutter={{
            top: 'medium',
            bottom: 'large',
            left: 'medium',
            right: 'medium',
          }}
        >
          <Col
            size={7} gutter={{ bottom: 'large' }}
            className={styles.logo}
          >
            <img src={imgLogo} />
          </Col>

          <Col className={styles.form} gutter="large">
            { this._renderForm() }
          </Col>

          <Col gutter={{ top: 'medium' }} className="text-center">
            HelloFresh ®
          </Col>
        </Col>
      </div>
    );
  }
}

export default connect()(LoginScreen);
