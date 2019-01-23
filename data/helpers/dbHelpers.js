const db = require('../dbConfig.js');

module.exports = {
  addUser: (user) => {
    return db('users').insert(user);
  },
  settings: {
    pwdHashLength: 14 // 14 is a good baseline for time complexity when comparing password/hash for login
  }
};