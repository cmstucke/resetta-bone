const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
// const validateRegisterInput = require('../../validations/register');
// const validateLoginInput = require('../../validations/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
      message: "GET /api/users"
    });
  });

router.post('/', async function(req, res, next) {
    try {
        const newUser = new User({userName: 'tvong', email: 'vong@gmail.com', hashedPassword: '123456789'})
        newUser.save()
        console.log('User created')
    } catch(error) {
        console.log(error)
    }

})



  module.exports = router
