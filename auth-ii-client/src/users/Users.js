import React from 'react';
import axios from 'axios';
import { list } from 'postcss';

class Users extends React.Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;
    console.log('endpoint', endpoint);

    try {
      const token = localStorage.getItem('jwt');
      console.log(token);
      const requestOptions = {
        headers: {
          authorization: token,
        },
      };

      const response = await axios.get(endpoint, requestOptions);
      this.setState({ users: response.data.users });
    } catch (error) {
      console.error('we ran into an issue getting the users');
    }
  }

  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Users;
