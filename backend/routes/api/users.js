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
    // check('firstName')
    // .exists({checkFalsy: true})
    // .withMessage('Please provide your first name.'),
    // check('lastName')
    // .exists({checkFalsy: true})
    // .withMessage('Please provide your last name.'),
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

const validateLogin = [
  check('email')
  .exists({checkFalsy:true})
  .notEmpty()
  .withMessage('Please provide a valid email.'),
  check('password')
  .exists({checkFalsy: true})
  .withMessage('Please provide a password'),
  handleValidationErrors
]

/* GET users listing. */

// Passed in handValidtionErrors middleware that we created

  router.post('/signup', validateSignup, async function(req, res, next) {
    const {email, password} = req.body

    const emailExists = await User.findOne({email: email})

    if(emailExists) {
        const err = new Error('Email is already associated with another account.')
        err.status = 403
        err.email = 'Email is already associated with another account.'
        return next(err)
    } else {
      // const user = await User.signup({firstName, lastName, email, username, password})

      const newUser = new User({
        // firstName: firstName,
        // lastName: lastName,
        email: email
      })

       // Salt password and save
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json(await loginUser(user));
        }
        catch(err) {
          next(err);
        }
      })
    });



    }
  })

  router.get('/current', restoreUser, (req, res) => {
    if (!isProduction) {
      // In development, allow React server to gain access to the CSRF token
      // whenever the current user information is first loaded into the
      // React application
      const csrfToken = req.csrfToken();
      res.cookie("CSRF-TOKEN", csrfToken);
    }
    if (!req.user) return res.json(null);
    res.json({
      _id: req.user._id,
      // profileImageUrl: req.user.profileImageUrl.includes('aws') ? req.user.profileImageUrl : retrievePrivateFile(req.user.profileImageUrl),
      email: req.user.email
    });
  });

  // User Login

  router.post('/login', validateLogin, async (req, res, next) => {
    passport.authenticate('local', validateLogin, async function(err, user) {
      if (err) return next(err);
      if (!user) {
        const err = new Error('Invalid credentials');
        err.statusCode = 400;
        err.errors = { email: "Invalid credentials" };
        return next(err);
      }
      return res.json(await loginUser(user));
    })(req, res, next);
  })



  module.exports = router
