// @flow

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Container from 'src/ui/components/container';
import Col from 'src/ui/components/col';
import imgLogo from 'src/ui/assets/images/hellofresh-logo.svg';
import { logout } from 'src/actions/auth';
import styles from './styles.styl';

class Header extends React.Component {
  static displayName = 'Header';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const {
      dispatch,
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
                  onClick={() => (dispatch(logout()))}>
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

export default connect(mapStateToProps)(Header);
