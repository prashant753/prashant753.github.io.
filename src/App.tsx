import * as React from "react";
import Login from './modules/login/Login';

export interface IAppProps { }

class App extends React.Component<IAppProps> {

  public render() {
    return (
      <React.Fragment>
        <div className="login">
          <Login />
        </div>
        <footer className="footer">
          <p className="text-color footer-text">© Prashant. All rights reserved.</p>
        </footer>
      </React.Fragment>
    )
  }
}

export default App;
