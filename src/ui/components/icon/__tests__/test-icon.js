import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../';

jest.mock('../styles.styl', () => ({}));

describe('Grid', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <Icon name="foo" className="bar" />
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
