// @flow

import React, { PropTypes } from 'react';
import Icon from 'src/ui/components/icon';
import classNames from 'classnames';
import styles from './styles.styl';

type State = {
  userRating: number,
};

const RATING_SIZE: number = 5;

class Rating extends React.Component {
  static displayName = 'Rating';

  static propTypes = {
    rating: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    rating: 0,
    onClick: () => null,
  };

  state: State = {
    userRating: 0,
  };

  _onClick: Function;

  constructor(props: Object) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick(value: number): void {
    const { onClick } = this.props;

    this.setState({ userRating: value });
    onClick(value);
  }

  render() {
    const { rating } = this.props;
    const { userRating } = this.state;

    const ratingValue = userRating || (rating === null ? 0 : Math.floor(rating));

    const stars: Array<React$Element<*>> = [...Array(RATING_SIZE)].map((_, i) => {
      const value = i + 1;
      const isActive = value <= ratingValue;

      return (
        <div
          key={i}
          onClick={() => this._onClick(value)}
          className={classNames(
            styles.iconStar,
            { [styles.isActive]: isActive }
          )}
        >
          <Icon name="star" />
        </div>
      );
    });

    return (
      <div className={styles.rating}>
        {stars}
      </div>
    );
  }
}

export default Rating;
