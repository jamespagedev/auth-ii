import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Users from './users/Users';
import Signin from './auth/Signin';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/signin">Signin</NavLink>
            &nbsp;|&nbsp;
						<NavLink to="/users">Users</NavLink>
            <button onClick={this.signout}>Signout</button>
          </nav>
        </header>
        <main>
          <Route path="/signin" component={Signin} />
          <Route path="/users" component={Users} />
        </main>
      </>
    );
  }

  signout = () => {
    localStorage.removeItem('jwt');
  };
}

export default App;
