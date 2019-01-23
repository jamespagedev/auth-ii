/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbHelpers.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name,
    roles: ['admins', 'accountants', 'human resources'] // should come from the database user.roles
  }

  const secret = process.env.JWT_SECRET; // bad practice because of env, it can be hackable

  const options = {
    expiresIn: 1000 * 20 // 20 seconds... otherValues(1000, '2 days', '10h', '7d')
  };

  return jwt.sign(payload, secret, options);
}

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
router.post('/login', (req, res) => {
  // Check username exist AND client password matches hash password in db
  const userCreds = req.body;

  db.findByUsername(userCreds.username)
    .first() // returns the first single object (containing the user found) in the array. If no objects were found, an empty array is returned.
    .then(user => {
      // If user object was obtained AND...
      // the client password matches the db hash password
      if (user && bcrypt.compareSync(userCreds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: 'Logged in', token });
      } else {
        res.status(401).json({ err: "You shall not pass!" });
      }
    })
    .catch(err => res.status(500).send(err));
})

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;