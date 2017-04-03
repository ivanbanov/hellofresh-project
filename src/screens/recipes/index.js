// @flow

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Col from 'src/ui/components/col';
import Container from 'src/ui/components/container';
import Grid from 'src/ui/components/grid';
import imgLogo from 'src/ui/assets/images/hellofresh-logo.svg';
import { logout } from 'src/actions/auth';
import Recipe from './components/recipe';
import api from 'src/api';
import styles from './styles.styl';

type State = {
  recipes: Array<Object>
};

class RecipesScreen extends React.Component {
  static displayName = 'RecipesScreen';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state: State = {
    recipes: [],
  };

  constructor(props: Object) {
    super(props);

    window.xxx = api;

    api
      .get('/recipes')
      // .catch(e => { debugger })
      .then(response => {
        // debugger;
        this.setState({ recipes: response.data.recipes })
      });
  }

  _renderHeader(): React$Element<*> {
    const { dispatch } = this.props;

    return (
      <div className={styles.navbar}>
        <Container>
          <Col gutter="medium">
            <img src={imgLogo} className={styles.imgLogo} />
            <div className="text-right text-uppercase text-small">
              <a onClick={() => (dispatch(logout()))}>
                Logout
              </a>
            </div>
          </Col>
        </Container>
      </div>
    );
  }

  _renderRecipes(): React$Element<*> {
    const { recipes } = this.state;

    return (
      <Grid>
        {recipes.map(this._renderRecipe)}
      </Grid>
    );
  }

  _renderRecipe(recipe, key): React$Element<*> {
    return (
      <Col
        key={key}
        size={{ xs: 12, medium: 6, large: 3 }}
        gutter={{ left: 'large', right: 'large', top: 'medium', bottom: 'medium' }}
      >
        <Recipe recipe={recipe} />
      </Col>
    );
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Recipes 🗒</title>
        </Helmet>

        {this._renderHeader()}

        <Container>
          <Col gutter={{ top: 'large', bottom: 'large' }} className={styles.title}>
            <h1 className="text-huge text-center text-uppercase">Recipes</h1>
          </Col>

          {this._renderRecipes()}
        </Container>
      </div>
    );
  }
}

export default connect()(RecipesScreen);
