const express = require('express');
const AccountModel = require('../models/Account');

let router = express.Router();

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      errorCode: 1,
      message: 'Invalid username or password'
    });
  } else {
    AccountModel.findOne({
      username: username,
    })
      .then(data => {
        if (data) {
          res.status(300).json({
            error: 1,
            message: 'Account is already registered'
          });
        } else {
          return AccountModel.create({
            username: username,
            password: password,
          });
        }
      })
      .then(data => {
        if (data) res.status(200).json("Register success");
      })
      .catch(err => res.status(500).json('Error from server'));
  }
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({
      error: 1,
      message: 'Username or password is Valid'
    });
  } else {
    AccountModel.findOne({
      username: username,
      password: password
    })
      .then(data => {
        if (data) {
          res.status(200).json({
            error: 0,
            message: 'Login successful'
          });
        } else {
          res.status(300).json({
            error: 2,
            message: `Account is not registered`
          });
        }
      })
      .catch(err => {
        console.log("ERROR FROM SERVER", err);
        res.status(500).json({
          error: -1,
          message: 'Error from server',
        });
      });
  }
});

module.exports = router;