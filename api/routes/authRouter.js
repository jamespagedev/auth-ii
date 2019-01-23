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
    department: user.department // should come from the database user.department
  }

  const secret = process.env.JWT_SECRET; // bad practice because of env, it can be hackable

  const options = {
    expiresIn: 60 // 15 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  return jwt.sign(payload, secret, options);
}

function authenticate(req, res, next) {
  // the auth token is normally sent in the authorization header
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

function authorizeDepartments(departments) {
  return function (req, res, next) {
    if (departments.includes(req.decodedToken.department)) {
      next();
    } else {
      res.status(403).json({ message: `Access Denied: You must be in one of the following departments [${departments}]` })
    }
  }
}

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
// protect this endpoint so only admin users can see it
router.get('/users', authenticate, authorizeDepartments([db.settings.departments[0]]), (req, res) => {
  db.getAllUsers('users')
    .select('id', 'username', 'department')
    .then(users => res.status(200).json({ users, decodedToken: req.decodedToken }))
    .catch(err => res.status(500).json({ error: err }));
});

// protect this endpoint so only admin and accountant users can see it
router.get('/accountants/users', authenticate, authorizeDepartments([db.settings.departments[0], db.settings.departments[1]]), (req, res) => {
  db.getAllUsers('users')
    .select('username')
    .where({ department: db.settings.departments[1] }) // accountants department users only
    .then(users => res.status(200).json({ users, decodedToken: req.decodedToken }))
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/register', (req, res) => {
  // Precondition - Username must be unique (not used in database)
  const newUserCreds = req.body;

  // Creates a hash password to store in the database...
  newUserCreds.password = bcrypt.hashSync(newUserCreds.password, db.settings.pwdHashLength);

  // Adds a single user to the database
  db.addUser(newUserCreds)
    .then(Ids => {
      res.status(201).json({ id: Ids[0] }); // returns the userId created by the database
    })
    .catch(err => res.status(500).send(err));
})

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