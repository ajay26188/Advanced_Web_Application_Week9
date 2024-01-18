"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcryptjs");

var mongoose = require("mongoose");

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult;

var User = require("../models/User");

var jwt = require("jsonwebtoken");

var validateToken = require("../auth/validateToken.js");
/* GET users listing. */


router.get('/list', validateToken, function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.render("users", {
      users: users
    });
  });
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', body("email").trim().escape(), body("password").escape(), function (req, res, next) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      return res.status(403).json({
        message: "Login faile :("
      });
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        if (err) throw err;

        if (isMatch) {
          var jwtPayload = {
            id: user._id,
            email: user.email
          };
          jwt.sign(jwtPayload, process.env.SECRET, {
            expiresIn: 120
          }, function (err, token) {
            res.json({
              success: true,
              token: token
            });
          });
        }
      });
    }
  });
});
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.post('/register', body("email").isLength({
  min: 3
}).trim().escape(), body("password").isLength({
  min: 5
}), function (req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      console.log(err);
      throw err;
    }

    ;

    if (user) {
      return res.status(403).json({
        email: "Username already in use."
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) throw err;
          User.create({
            email: req.body.email,
            password: hash
          }, function (err, ok) {
            if (err) throw err;
            return res.redirect("/users/login");
          });
        });
      });
    }
  });
});
module.exports = router;