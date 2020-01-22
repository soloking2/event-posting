const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(result => {
            res.status(201).json({
              messag: 'User created',
              result: result
            });
          })
          .catch(err => {
            res.status(500).json({
                message: "Invalid authentication credentials"
            })
          });
      });
  }

  exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: 'Authentication failed'
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          res.status(401).json({
            message: 'Authentication failed'
          });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'this_is_what_i_hide', { expiresIn: '1h' });
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        })
      })
      .catch(err => {
        res.status(401).json({
          message: 'Invalid Authentication Credentials'
        });
    })
  }