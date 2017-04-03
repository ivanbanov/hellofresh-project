// @flow

import React, { PropTypes } from 'react';
import Col from 'src/ui/components/col';
import Icon from 'src/ui/components/icon';
import Rating from 'src/ui/components/rating';
import classNames from 'classnames';
import styles from './styles.styl';

type State = {
  isFavorite: boolean,
};

class Recipe extends React.Component {
  static displayName = 'Recipe';

  static propTypes = {
    recipe: PropTypes.object.isRequired,
  }

  state: State = {
    isFavorite: false,
  };

  _setFavorite: Function;

  constructor(props: Object) {
    super(props);

    this._setFavorite = this._setFavorite.bind(this);
  }

  _setFavorite(event: Object): void {
    event.preventDefault();

    const { isFavorite } = this.state;

    this.setState({ isFavorite: !isFavorite });

    // api.post here!
  }

  render() {
    const { recipe } = this.props;
    const { isFavorite } = this.state;

    return (
      <div className={styles.recipe}>
        <a href="#" onClick={this._setFavorite}>
          <Icon
            name="star"
            className={classNames(styles.favoriteIcon, { [styles.isFavorite]: isFavorite })} />
        </a>

        <img src={recipe.thumb} className={styles.thumb} />

        <Col gutter="medium">
          <Col gutter={{ bottom: 'medium' }} className="text-large text-semibold">
            {recipe.name}
          </Col>

          <Col gutter={{ top: 'small', bottom: 'small' }} className={styles.rating}>
            <Rating rating={recipe.rating} /> {/* onClick api.post */}
          </Col>

          <Col gutter={{ top: 'medium' }}>
            {recipe.description.slice(0, 150).concat('...')}
          </Col>
        </Col>
      </div>
    );
  }
}

export default Recipe;
