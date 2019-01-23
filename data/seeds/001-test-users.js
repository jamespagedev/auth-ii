const bcrypt = require('bcryptjs');
const db = require('../helpers/dbRegHelpers.js');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Precondition - Ensure passwords are no longer than 16 characters
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'JamesP',
          password: bcrypt.hashSync('pass123', db.settings.pwdHashLength),
          department: 'admin'
        },
        {
          username: 'JohnK',
          password: bcrypt.hashSync('Password123', db.settings.pwdHashLength),
          department: 'accountant'
        },
        {
          username: 'CrystalH',
          password: bcrypt.hashSync('Pswd^$haha', db.settings.pwdHashLength),
          department: 'accountant'
        },
        {
          username: 'MikeL',
          password: bcrypt.hashSync('ImWorkingHere', db.settings.pwdHashLength),
          department: 'human resources'
        },
        {
          username: 'SharolL',
          password: bcrypt.hashSync('ImWorkingHere', db.settings.pwdHashLength),
          department: 'human resources'
        }
      ]);
    });
};
