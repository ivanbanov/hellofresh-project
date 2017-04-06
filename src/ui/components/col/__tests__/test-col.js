import React from 'react';
import renderer from 'react-test-renderer';
import Col from '../';

jest.mock('src/ui/styles/mixins/media-query.styl', () => ({}));
jest.mock('src/ui/styles/setup.styl', () => ({}));
jest.mock('../styles.styl', () => ({ COLS: 12 }));

describe('Col', () => {
  it('should render properly', () => {
    const component1 = renderer.create(
      <Col
        gutter="large"
        size={12}
        className="col-foo-bar"
        style={{ backgroundColor: 'red' }}
      >
        <div>Col</div>
      </Col>
    );

    const component2 = renderer.create(
      <Col
        gutter={{ top: 'large' }}
        size={{ small: 12, large: 6 }}
      />
    );

    const tree = component1.toJSON();
    const tree2 = component2.toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});
