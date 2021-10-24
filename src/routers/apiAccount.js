const express = require('express');
const AccountModel = require('../models/Account');

let router = express.Router();
const PAGE_SIZE = 3;

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
        const { password, ...others } = data._doc;
        res.json(others);
      })
      .catch(err => {
        res.status(500).json("Error from sever");
      });
  }
});

router.get('/', (req, res, next) => {
  let page = req.query.page;

  if (page) {
    page = parseInt(page);
    if (!page) {
      res.status(404).json([]);
    } else {
      if (page < 1) page = 1;
      const skip = (page - 1) * PAGE_SIZE;
      // const skip = start + PAGE_SIZE;

      AccountModel.find({}).skip(skip).limit(PAGE_SIZE)
        .then(data => {
          AccountModel.countDocuments({}).then(count => {
            const total = Math.ceil(count / PAGE_SIZE);
            res.json({
              total: total,
              data
            });
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json("Error from server");
        });
    }
  } else {
    AccountModel.find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json("Error from server");
      });
  }
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