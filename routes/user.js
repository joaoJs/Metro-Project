const express  = require('express');

const StationModel = require('../models/station');
const UserModel = require('../models/user');

const router = express.Router();

// Finds logged in user
router.get('/user', (req,res,next) => {
  UserModel.findById(req.user._id, (err, user) => {
    if (err) {
        console.log('Error finding user ---> ', err);
        res.status(500).json({ errorMessage: 'Finding user went wrong.' });
        return;
      }

      res.status(200).json(user);

  });
});


module.exports = router;
