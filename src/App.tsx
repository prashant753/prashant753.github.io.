import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './state_management/store';
import Navigation from './navigation/Navigation'

const history = createBrowserHistory();

class App extends React.Component<any> {

  public render() {
    return (
        <Provider store={store}>
        <BrowserRouter>
          <Navigation history={history} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
