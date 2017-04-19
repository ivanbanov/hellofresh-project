// @flow

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getRecipes as getRecipesAction } from 'src/actions/recipes';
import bindAll from 'lodash/bindAll';
import Header from 'src/screens/components/header';
import Footer from 'src/screens/components/footer';
import Col from 'src/ui/components/col';
import Container from 'src/ui/components/container';
import Grid from 'src/ui/components/grid';
import classNames from 'classnames';
import Recipe from './components/recipe';
import styles from './styles.styl';

type State = {
  recipeDetail: Object,
  showRecipeDetail: boolean,
};

class RecipesScreen extends React.Component {
  static displayName = 'RecipesScreen';

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    getRecipesAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    recipes: [],
    getRecipesAction: () => [],
  };

  state: State = {
    recipeDetail: {},
    showRecipeDetail: false,
  };

  _showRecipeDetail: Function;
  _hideRecipeDetail: Function;
  _renderRecipes: Function;
  _renderRecipe: Function;

  constructor(props: Object) {
    super(props);

    bindAll(this, [
      '_showRecipeDetail',
      '_hideRecipeDetail',
      '_renderRecipes',
      '_renderRecipe',
    ]);
  }

  componentWillMount() {
    this.props.getRecipesAction();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this._hideRecipeDetail);
  }

  _showRecipeDetail(): void {
    window.addEventListener('keyup', this._hideRecipeDetail);

    this.setState({ showRecipeDetail: true });
  }

  _hideRecipeDetail(event: Object): void {
    if ((typeof event === 'object' && event.keyCode === 27) || (event.type === 'click')) {
      this.setState({ showRecipeDetail: false });
    }

    window.removeEventListener('keyup', this._hideRecipeDetail);
  }

  _renderRecipes(): React$Element<*> {
    const { recipes } = this.props;

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
        size={{ small: 12, medium: 6, large: 4 }}
        gutter={{ left: 'large', right: 'large', top: 'medium', bottom: 'medium' }}
      >
        <Recipe recipe={recipe} onClick={() => {
          this.setState({ recipeDetail: recipe });
          this._showRecipeDetail();
        }} />
      </Col>
    );
  }

  render() {
    const {
      recipeDetail,
      showRecipeDetail,
    } = this.state;

    return (
      <div>
        <Helmet>
          <title>Recipes 🗒</title>
        </Helmet>

        <Header />

        <Container>
          <Col gutter={{ top: 'large', bottom: 'large' }} className={styles.title}>
            <h1 className={classNames(
              styles.title,
              'text-huge text-center text-uppercase'
            )}>
              Recipes
            </h1>
          </Col>

          {this._renderRecipes()}
        </Container>

        <Footer />

        {
          showRecipeDetail &&
          <Col
            className={styles.recipeDetail}
            onClick={this._hideRecipeDetail}
            gutter="large"
          >
            <Col
              className={styles.recipeDetailContent}
              size={{ small: 12, medium: 9, large: 6 }}
              onClick={event => event.stopPropagation()}
            >
              <Recipe recipe={recipeDetail} showDetail={showRecipeDetail} />
            </Col>
          </Col>
        }
      </div>
    );
  }
}

function mapStateToProps(state: Object): Object {
  const { recipes } = state.recipesReducer;

  return { recipes };
}

function mapDispatchToProps(dispatch: Function): Object {
  return bindActionCreators({ getRecipesAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);
