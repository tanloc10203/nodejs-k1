const express = require('express');
const AccountModel = require('../models/Account');

let router = express.Router();

router.post('/', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).json('Username and password is required');
  } else {
    AccountModel.create({
      username: username,
      password: password
    })
      .then(data => {
        res.json("Add account success");
      })
      .catch(err => {
        res.status(500).json("Error from sever");
      });
  }
});

router.get('/', (req, res, next) => {
  AccountModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json("Error from server");
    });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  AccountModel.findById(id)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(400).json('Account not found');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Error from server');
    });
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let username = req.body.username;
  let password = req.body.password;
  if (username || password) {
    AccountModel.findByIdAndUpdate(id, {
      username: username,
      password: password,
    })
      .then(data => {
        res.json('Cập nhật thành công');
      })
      .catch(err => {
        console.log(err);
        res.status(500).json("Error from server");
      });
  } else {
    res.status(400).json('Không thể cập nhật');
  }
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  AccountModel.findByIdAndDelete(id)
    .then(data => {
      res.json("Xóa account thành công");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("Error from server");
    });
});

module.exports = router;