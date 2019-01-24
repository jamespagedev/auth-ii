import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    department: ''
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
          <label htmlFor="">Department</label>
          <input
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <button type="submit">Signup</button>
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

    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log('Account Successfully Created. Please Login.')
      })
      .catch(err => console.err(err));
  };
}

export default Signup;
