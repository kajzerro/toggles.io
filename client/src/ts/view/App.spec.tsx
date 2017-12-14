import 'raf/polyfill';

import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

const { render } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('should render a welcoming div', () => {
    const rendered = render(<App />);
    expect(rendered).toMatchSnapshot();
  });
});
