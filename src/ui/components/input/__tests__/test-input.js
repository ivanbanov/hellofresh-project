import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Input from '../';

jest.mock('src/ui/styles/setup.styl', () => ({}));
jest.mock('src/ui/components/col', () => (() => <div>Col</div>));
jest.mock('../styles.styl', () => ({}));

describe('Button', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <Input
        placeholder="placeholder"
        type="number"
        value="foo"
        name="bar"
        required
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call call the validations', () => {
    const fn = jest.fn();
    const fn2 = jest.fn();

    const component = shallow(
      <Input validation={fn} />
    );

    const component2 = shallow(
      <Input validation={[() => true, fn2]} />
    );

    component.find('input').simulate('blur', { target: { value: 'foo-bar' } });
    component2.find('input').simulate('blur', { target: { value: 'foo-bar' } });

    expect(fn).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  it('should call onChange function', () => {
    const fn = jest.fn();

    const component = shallow(
      <Input onChange={fn} />
    );

    component.find('input').simulate('change');

    expect(fn).toHaveBeenCalled();
  });
});
