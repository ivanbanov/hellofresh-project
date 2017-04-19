// @flow

import React, { PropTypes } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import session from 'src/utils/auth/session';

class RestrictRoute extends React.Component {
  static displayName = 'RestrictRoute';

  static propTypes = {
    component: PropTypes.func.isRequired,
  };

  _routeRender: Function;

  constructor(props: Object) {
    super(props);

    this._routeRender = this._routeRender.bind(this);
  }

  _routeRender(props: Object): React$Element<*> {
    const { component: Component } = this.props;
    const isAuthenticated = session.isAuthenticated();

    return isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login' }} />;
  }

  render() {
    const {
      component,
      ...otherProps
    } = this.props;

    return (
      <Route render={this._routeRender} {...otherProps} />
    );
  }
}

export default RestrictRoute;
