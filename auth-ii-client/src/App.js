import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Users from './users/Users';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/signin">Signin</NavLink>
            &nbsp;|&nbsp;
						<NavLink to="/signup">Signup</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.signout}>Signout</button>
          </nav>
        </header>
        <main>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
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
