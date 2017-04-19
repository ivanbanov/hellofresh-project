// @flow

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import bindAll from 'lodash/bindAll';
import Grid from 'src/ui/components/grid';
import Col from 'src/ui/components/col';
import Icon from 'src/ui/components/icon';
import Rating from 'src/ui/components/rating';
import {
  setFavorite as setFavoriteAction,
  setRating as setRatingAction,
} from 'src/actions/recipes';
import classNames from 'classnames';
import styles from './styles.styl';

const EMPTY_VALUE = '--';

const DIFFICULTY_MAPPER = [
  'Easy',
  'Medium',
  'Hard',
];

type State = {
  country: string,
};

class Recipe extends React.Component {
  static displayName = 'Recipe';

  static propTypes = {
    recipe: PropTypes.object.isRequired,
    showDetail: PropTypes.bool,
    onClick: PropTypes.func,
    setFavoriteAction: PropTypes.func.isRequired,
    setRatingAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    showDetail: false,
    setFavoriteAction: () => null,
    setRatingAction: () => null,
  };

  state: State = {
    country: '',
  };

  _setFavorite: Function;
  _setRating: Function;
  _onClick: Function;

  constructor(props: Object) {
    super(props);

    bindAll(this, [
      '_setFavorite',
      '_setRating',
      '_onClick',
    ]);
  }

  componentDidMount() {
    const { recipe } = this.props;

    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${recipe.user.latlng}`,
    }).then((response) => {
      this.setState({ country: response.data.results[1].address_components[1].long_name });
    });
  }

  _setFavorite(): void {
    const {
      recipe,
      setFavoriteAction: setFavorite,
    } = this.props;

    setFavorite(recipe.id);
  }

  _setRating(value: number): void {
    const {
      recipe,
      setRatingAction: setRating,
    } = this.props;

    setRating(recipe.id, value);
  }

  _onClick(event: Object): void {
    event.preventDefault();

    const {
      onClick,
      showDetail,
    } = this.props;

    if (!showDetail) {
      onClick();
    }
  }

  _renderFavorite() {
    const {
      recipe,
      favorites,
    } = this.props;

    const isFavorite: boolean = Boolean(favorites[recipe.id]);

    return (
      <a href="#" onClick={(event) => {
        event.preventDefault();
        this._setFavorite();
      }}>
        <Icon
          name="star"
          className={classNames(
            styles.favoriteIcon,
            { [styles.isFavorite]: isFavorite }
          )}
        />
      </a>
    );
  }

  _renderTitle() {
    const {
      showDetail,
      recipe,
    } = this.props;

    return (
      <Col gutter={{ bottom: 'medium' }}>
        <span
          className={classNames(
            'text-large text-semibold',
            { [styles.clickable]: !showDetail },
          )}
          onClick={this._onClick}
        >
          {recipe.name}
        </span>

        {
          showDetail &&
          <span>&nbsp;{recipe.headline}</span>
        }
      </Col>
    );
  }

  _renderRating() {
    const {
      recipe,
      ratings,
      showDetail,
    } = this.props;

    const rating: number = ratings[recipe.id] || recipe.rating;

    return (
      <Col gutter={{ top: 'small', bottom: 'small' }} className={styles.rating}>
        <Grid className={styles.ratingGrid}>
          <Col size={6}>
            <Rating
              rating={rating}
              readonly={!showDetail}
              onClick={this._setRating}
            />
          </Col>

          <Col size={6} className="text-right">
            {Number(recipe.ratings) + (ratings[recipe.id] ? 1 : 0)} Ratings
          </Col>
        </Grid>
      </Col>
    );
  }

  _renderDetails() {
    const { showDetail } = this.props;

    return (
      <Col gutter="medium">
        {this._renderTitle()}
        {this._renderRating()}

        <Col gutter={{ top: 'medium' }}>
          {
            showDetail
              ? this._renderFullDetail()
              : this._renderShortDetail()
          }
        </Col>
      </Col>
    );
  }

  _renderShortDetail() {
    const { recipe } = this.props;

    return (
      <div>
        <span>{(recipe.description || '').slice(0, 150).concat('... ')}</span>
        <a href="#" className="text-semibold" onClick={this._onClick}>
          more details
        </a>
      </div>
    );
  }

  _renderFullDetail() {
    const { recipe } = this.props;
    const Title: Function = (title, icon) => (
      <Col gutter={{ bottom: 'small' }} className="text-semibold">
        {icon && <span><Icon name={icon} className="text-huge" />&nbsp;</span>}
        {title}
      </Col>
    );

    const { country } = this.state;

    return (
      <div>
        <Col gutter={{ bottom: 'small' }} size={12} className={styles.description}>
          {recipe.description}
        </Col>

        <Col gutter={{ top: 'medium' }}>
          <Grid>
            <Col size={{ small: 12, large: 6 }}>
              <Col className={styles.fullDetailSection}>
                {Title('Ingredients', 'box')}
                <ul>
                  {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Col>

              <Col className={styles.fullDetailSection}>
                {Title('Sent by', 'user')}
                <div>
                  <strong>Name:</strong>&nbsp;{recipe.user.name || EMPTY_VALUE}
                </div>

                <div>
                  <strong>Email:</strong>&nbsp;{recipe.user.email || EMPTY_VALUE}
                </div>

                <div>
                  <strong>Location:</strong>&nbsp;{country || EMPTY_VALUE}
                </div>
              </Col>
            </Col>

            <Col size={{ small: 12, large: 6 }}>
              <Col className={styles.fullDetailSection}>
                {Title('Nutritional infos', 'leaf')}
                <div>
                  <strong>Calories:</strong>&nbsp;{recipe.calories || EMPTY_VALUE}
                </div>

                <div>
                  <strong>Proteins:</strong>&nbsp;{recipe.proteins || EMPTY_VALUE}
                </div>

                <div>
                  <strong>Carbos:</strong>&nbsp;{recipe.carbos || EMPTY_VALUE}
                </div>

                <div>
                  <strong>Fats:</strong>&nbsp;{recipe.fats || EMPTY_VALUE}
                </div>

                <div>
                  <strong>Fibers:</strong>&nbsp;{recipe.fibers || EMPTY_VALUE}
                </div>
              </Col>

              <Col className={styles.fullDetailSection}>
                {Title('Time', 'cloack')}
                <span>{Number(recipe.time.match(/\d+/))} minutes</span>
              </Col>

              <Col className={styles.fullDetailSection}>
                {Title('Difficulty', 'dificulty')}
                <span>{DIFFICULTY_MAPPER[Number(recipe.difficulty)]}</span>
              </Col>
            </Col>
          </Grid>
        </Col>
      </div>
    );
  }

  render() {
    const {
      recipe,
      showDetail,
    } = this.props;

    return (
      <div className={classNames(styles.recipe)}>
        {this._renderFavorite()}

        <Col gutter={{
          top: 'small',
          left: 'small',
          right: 'small',
        }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            onClick={this._onClick}
            className={classNames(
              styles.image,
              { [styles.clickable]: !showDetail },
            )}
          />
        </Col>

        {this._renderDetails()}
      </div>
    );
  }
}

function mapStateToProps(state: Object): Object {
  const {
    ratings,
    favorites,
  } = state.recipesReducer;

  return {
    ratings,
    favorites,
  };
}

function mapDispatchToProps(dispatch: Function): Object {
  return bindActionCreators({
    setFavoriteAction,
    setRatingAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
