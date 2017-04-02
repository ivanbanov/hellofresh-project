// @flow

import React, { PropTypes } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

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
    const { component } = this.props;
    const isAuthenticated = window.localStorage.getItem('token');

    return isAuthenticated
      ? React.createElement(component, props)
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
