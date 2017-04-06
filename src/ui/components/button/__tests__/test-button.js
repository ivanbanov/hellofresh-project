import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../';

jest.mock('../styles.styl', () => ({}));

describe('Button', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <Button
        className="button"
        value="Button"
        disabled
        loading
        block
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick', () => {
    const fn = jest.fn();

    const component = renderer.create(
      <Button
        onClick={fn}
        value="onClick"
      />
    );

    const tree = component.toJSON();
    tree.props.onClick();

    expect(fn).toHaveBeenCalled();
  });

  it('should render as link element <a>', () => {
    const component = renderer.create(
      <Button
        href="http://foobar.com"
        value="link"
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
