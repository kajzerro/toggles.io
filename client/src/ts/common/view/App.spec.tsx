import 'raf/polyfill';

import * as React from 'react';
import { createBrowserHistory } from 'history';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

const { shallow } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  const config = { routerHistory: createBrowserHistory(), uuid: jest.fn() };

  it('should render a authorized routes when user is authorized', () => {
    const elem = <App dependencies={config} authorized={true} username={null} onLogout={null}
                      errors={[]} onRemoveError={null} isLogoutLoading={false} />;
    const rendered = shallow(elem);
    expect(rendered).toMatchSnapshot();
  });

  it('should render a unauthorized routes when user is unathorized', () => {
    const elem = <App dependencies={config} authorized={false} username={'mike'} onLogout={null}
                      errors={[]} onRemoveError={null} isLogoutLoading={false} />;
    const rendered = shallow(elem);
    expect(rendered).toMatchSnapshot();
  });
});
