import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Rating from '../';

jest.mock('../styles.styl', () => ({}));
jest.mock('src/ui/components/icon', () => (() => <div>Icon</div>));

describe('Button', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <Rating rating={5} readonly />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick', () => {
    const fn = jest.fn();

    const component = shallow(
      <Rating onClick={fn} />
    );

    component.find('div > div').first().simulate('click');

    expect(fn).toHaveBeenCalled();
  });
});
