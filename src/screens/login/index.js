// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import Col from 'src/ui/components/col';
import Container from 'src/ui/components/container';
import Input from 'src/ui/components/input';
import imgLogo from 'src/ui/assets/images/hellofresh-logo-2.png';
import styles from './styles.styl';

class LoginScreen extends React.Component {
  static displayName = 'LoginScreen';

  _renderForm() {
    return (
      <form className="text-large">
        <Col>
          <Col gutter={{ bottom: 'small' }}>
            <label>Email</label>
          </Col>
          <Col>
            <Input name="email" placeholder="user@hellofresh.com" />
          </Col>
        </Col>

        <Col gutter={{top: 'medium'}}>
          <Col gutter={{ bottom: 'small' }}>
            <label>Password</label>
          </Col>
          <Col>
            <Input name="password" type="password" />
          </Col>
        </Col>
      </form>
    );
  }

  render() {
    return (
      <div className={styles.login}>
        <Helmet>
          <title>Login</title>
        </Helmet>

        <Col
          size={{ small: 12, medium: 8, large: 5 }}
          gutter={{
            top: 'medium', bottom: 'large',
            left: 'medium', right: 'medium',
          }}
        >
          <Col
            size={7} gutter={{bottom: 'large'}}
            className={styles.logo}
          >
            <img src={imgLogo} />
          </Col>

          <Col className={styles.form} gutter="large">
            { this._renderForm() }
          </Col>

          <Col
            size={12} gutter={{ top: 'medium' }}
            className="text-center"
          >
            HelloFresh ®
          </Col>
        </Col>
      </div>
    );
  }
}

export default LoginScreen;
