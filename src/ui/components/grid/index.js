// @flow

import React, { PropTypes } from 'react';
import styles from './styles.styl';
import Col from '../col';

function Grid({ children }: Object): React$Element<*> {
  console.log(children);

  return (
    <div className={styles.grid}>
      {children}
    </div>
  );
}

Grid.displayName = 'Grid';

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Col),
    PropTypes.arrayOf(PropTypes.instanceOf(Col)),
  ]),
};

export default Grid;
