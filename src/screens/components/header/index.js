// @flow

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'src/ui/components/container';
import Col from 'src/ui/components/col';
import imgLogo from 'src/ui/assets/images/hellofresh-logo.svg';
import { logout as logoutAction } from 'src/actions/auth';
import styles from './styles.styl';

class Header extends React.Component {
  static displayName = 'Header';

  static propTypes = {
    logoutAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const {
      logoutAction: logout,
      user,
    } = this.props;

    return (
      <div className={styles.navbar}>
        <Container>
          <Col gutter="medium">
            <img src={imgLogo} className={styles.imgLogo} />
            <div className="text-right">
              <span className="text-semibold">{user.name}</span>
              <span> - </span>
              <span>
                (<a
                  className="text-uppercase text-small"
                  onClick={logout}>
                  Logout
                </a>)
              </span>
            </div>
          </Col>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: Object): Object {
  return { user: state.authReducer.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
