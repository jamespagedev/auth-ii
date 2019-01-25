import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
  state = {
    username: 'JamesP',
    password: 'pass123',
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      })
      .catch(err => console.err(err));
  };
}

export default Signin;
