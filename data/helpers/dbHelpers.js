const db = require('../dbConfig.js');

module.exports = {
  getAllUsers: () => {
    return db('users');
  },
  findByUsername: (username) => {
    return db('users').where('username', username);
  },
  addUser: (user) => {
    return db('users').insert(user);
  },
  settings: {
    pwdHashLength: 14, // 14 is a good baseline for time complexity when comparing password/hash for login
    departments: ['admins', 'accountants', 'human resources', 'janitors'] // multiple dependancies, can change value of names... just not order of values
  }
};