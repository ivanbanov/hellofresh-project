import React from 'react';
import renderer from 'react-test-renderer';
import Container from '../';

jest.mock('../styles.styl', () => ({}));

describe('Container', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <Container>
        <div>Container</div>
      </Container>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
