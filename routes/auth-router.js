const express  = require('express');
const bcrypt   = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user');

const router = express.Router();

// Sign up if all the fields are provided by the user
// error if username is already taken

router.post('/process-signup', (req,res,next) => {
  console.log(req.body);
  if (!req.body.username ||
      !req.body.email ||
      !req.body.password) {
        console.log('HERE!');
    res.status(400).json({errorMessage: "We need both username and password."});
    return;
  }

  UserModel.findOne(
    {username: req.body.username},
    (err, user) => {
      if (err) {
        res.status(500).json({errorMessage: 'Error finding username.'});
        return;
      }

      if (user) {
        res.status(400).json({errorMessage: 'Username was taken.'});
        return;
      }

      // encrypts password
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(req.body.password, salt);

      // creates new user with provided username, email and password
      const theUser  = new UserModel ({
        username: req.body.username,
        email: req.body.email,
        password: hashPass
      });

      // saves the user to the database
      theUser.save((err) => {
        if (err) {
          res.status(500).json({ errorMessage: 'Error saving user.'});
          return;
        }

        // "req.login" is a Passport method
        req.login(theUser, (err) => {
          if (err) {
            console.log('User auto-login error', err);
            res.status(500).json({errorMessage: 'Error logging in user'});
            return;
          }

          theUser.password = undefined;
          res.status(200).json(theUser);
        });

      });
    }
  );
});

router.post('/process-login', (req,res,next) => {
  const customAuthCallback =
    passport.authenticate('local', (err, user, extraInfo) => {
      if (err) {
      res.status(500).json({ errorMessage: 'Login failed.'});
      return;
    }

      if (!user) {
        res.status(401).json({errorMessage: extraInfo.message});
        return;
      }

      req.login(user, (err) => {
        if (err) {
          res.status(500).json({errorMessage: 'Login Failed'});
          return;
        }

        console.log(req.user);
        user.password = undefined;
        console.log("again --> ", req.user);
        res.status(200).json(user);
      });
    }); // passport.authenticate('local')

    customAuthCallback(req,res,next);
}); // POST /api/process-login

router.delete('/logout', (req,res,next) => {
  console.log('inside logout router');
  // "req.logout" is a Passport function
  req.logout();
  res.status(200).json( { successMessage: 'Log out success!'});
});

router.get('/checklogin', (req,res,next) => {
  let amILoggedIn = false;
  if (req.user) {
    // sets password to undefined for safety
    req.user.password = undefined;
    amILoggedIn = true;
  }

  res.status(200).json({
    isLoggedIn: amILoggedIn,
    userInfo: req.user
  });
});

router.post('/update-user', (req,res,next) => {
    UserModel.findById(req.user._id, (err, user) => {

      if (err) {
        res.status(500).json({errorMessage: 'Error updating user.'});
        return;
      }
      user.trips = req.body.trips;

      user.save((err) => {
        if (err) {
          res.status(500).json({ errorMessage: 'Error saving user.'});
          return;
        }
      });

      res.status(200).json(user);

    });
});


module.exports = router;
