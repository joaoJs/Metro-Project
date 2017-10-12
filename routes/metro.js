const express  = require('express');
const bcrypt   = require('bcrypt');
const request = require('request');

const StationModel = require('../models/station');
const UserModel = require('../models/user');

const router = express.Router();


router.get('/stations',(req,res,next) => {
    StationModel.find()
      .sort({ no: 1})
      .exec((err, allStations) => {
      if (err) {
          console.log('Error finding stations ---> ', err);
          res.status(500).json({ errorMessage: 'Finding stations went wrong.' });
          return;
        }

        res.status(200).json(allStations);
    });
});

router.post('/trips', (req,res,next) => {
  console.log('User inside --> ', req.user);
  UserModel.findById(req.user._id, (err, user) => {
    if (err) {
      console.log("Error retrieving user --> ", err);
      res.status(500).json({ errorMessage: 'Finding User went wrong.' });
    }

    const newTrip = {
      date: new Date(),
      origin: req.body.origin,
      destination: req.body.destination,
      time: req.body.time,
      distance: req.body.distance
    };

    console.log(newTrip);

    user.trips.push(newTrip);

    user.save((err) => {
      if (err) {
        console.log('Error POSTING trip  --> ', err);
        res.status(500).json({ errorMessage: 'New trip went wrong'});
        return;
    }

    res.status(200).json(newTrip);

  });
});

});

router.get('/distance/:lat/:lng/:coords/:mode/:key', (req,res,next) => {

  const distanceUrl= 'https://maps.googleapis.com/maps/api/distancematrix/json?';

  request(
    distanceUrl + 'origins=' + req.params.lat + ',' + req.params.lng + '&destinations=' + req.params.coords + '&mode=' + req.params.mode + '&key=' + req.params.key,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const distance = JSON.parse(body);
        res.status(200).json(distance);
      } else {
        res.status(500).json(error);
      }
    }
  );
});

router.get('/distance-metro/:lat/:lng/:coords/:key', (req,res,next) => {

  const distanceUrl= 'https://maps.googleapis.com/maps/api/distancematrix/json?';

  request(
    distanceUrl + 'origins=' + req.params.lat + ',' + req.params.lng + '&destinations=' + req.params.coords + '&mode=transit&key=' + req.params.key,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const distance = JSON.parse(body);
        res.status(200).json(distance);
      } else {
        res.status(500).json(error);
      }
    }
  );

});

router.get('/distance-car/:lat/:lng/:coords/:key', (req,res,next) => {

  const distanceUrl= 'https://maps.googleapis.com/maps/api/distancematrix/json?';

  request(
    distanceUrl + 'origins=' + req.params.lat + ',' + req.params.lng + '&destinations=' + req.params.coords + '&mode=driving&departure_time=now&key=' + req.params.key,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const distance = JSON.parse(body);
        res.status(200).json(distance);
      } else {
        res.status(500).json(error);
      }
    }
  );

});


module.exports = router;
