const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const {check} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')
// const validateRegisterInput = require('../../validations/register');
// const validateLoginInput = require('../../validations/login');


// Validate Sign Up
const validateSignup = [
    check('firstName')
    .exists({checkFalsy: true})
    .withMessage('Please provide your first name.'),
    check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Please provide your last name.'),
    check('email')
    .exists({checkFalsy: true})
    .isEmail()
    .withMessage('Please provide a valid email'),
    check('password')
    .exists({checkFalsy: true})
    .isLength({min: 6})
    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const users = await User.find();

    // return users
    res.json({
       message: users
    });
  });

// router.post('/', async function(req, res, next) {
//     try {
//         const newUser = new User({username: 'tvong', email: 'vong@gmail.com', hashedPassword: '123456789'})
//         newUser.save()
//         console.log('User created')
//     } catch(error) {
//         console.log(error)
//     }

// })

// Passed in handValidtionErrors middleware that we created

  router.post('/', handleValidationErrors, async function(req, res, next) {
    const {firstName, lastName, email, password} = req.body

    const emailExists = await User.findOne({where: {email: email}})

    if(emailExists) {
        const err = new Error('Email is already associated with another account.')
        err.status = 403
        return next(err)
    }
  })



  module.exports = router
