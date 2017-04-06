import React from 'react';
import renderer from 'react-test-renderer';
import Grid from '../';

jest.mock('../styles.styl', () => ({}));

describe('Grid', () => {
  it('should render properly', () => {
    const component1 = renderer.create(
      <Grid>
        <div>Grid</div>
      </Grid>
    );

    const component2 = renderer.create(
      <Grid fluid>
        <div>Grid</div>
      </Grid>
    );

    const tree1 = component1.toJSON();
    const tree2 = component2.toJSON();

    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
