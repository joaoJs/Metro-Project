const mongoose = require('mongoose');

const StationModel = require('../models/station.js');

mongoose.connect('mongodb://localhost/metro-server');

const stationsArray = [
  {name: "Miami Zoo",
   latLng: {lat: 25.6071269, lng: -80.39927949999999},
   distToNext: 3965.0607739911657,
   timeToNext: 3,
   no: 0
  },
  {name: "West Perrine Park",
   latLng: {lat: 25.6104121, lng: -80.359949},
   distToNext: 2588.6435220066046,
   timeToNext: 3,
   no: 1
  },
  {name: "Jackson South Medical Center",
   latLng: {lat: 25.6298189, lng: -80.3457406},
   distToNext: 1766.9788734494489,
   timeToNext: 3,
   no: 2
  },
  {name: "The Falls",
   latLng: {lat: 25.644235, lng: -80.3383722},
   distToNext: 5174.801754946771,
   timeToNext: 3,
   no: 3
  },
  {name: "Dadeland South",
  latLng: {lat: 25.6850431, lng: -80.3136722},
  distToNext: 1151.9046000681071,
  timeToNext: 2,
  no: 4
  },
  {name: "Dadeland North",
  latLng: {lat: 25.6919369, lng: -80.3051089},
  distToNext: 2179.366329036528,
  timeToNext: 2,
  no: 5
  },
  {name: "South Miami",
  latLng: {lat: 25.7050916, lng: -80.2890178},
  distToNext: 15535.202538687874,
  timeToNext: 2,
  no: 6
  },
  {name: "University",
  latLng: {lat: 25.7148675, lng: -80.2770295},
  distToNext: 20139.1738466162,
  timeToNext: 3,
  no: 7
  },
  {name: "Douglas Road",
  latLng: {lat: 25.7327736, lng: -80.25486269999999},
  distToNext: 1783.5647563096068,
  timeToNext: 2,
  no: 8
  },
  {name: "Coconut Grove",
  latLng: {lat: 25.7397915, lng: -80.2388733},
  distToNext: 2933.348538064533,
  timeToNext: 3,
  no: 9
  },
  {name: "Vizcaya",
  latLng: {lat: 25.7497383, lng: -80.211783},
  distToNext: 2271.02809886992,
  timeToNext: 3,
  no: 10
  },
  {name: "Brickell",
  latLng: {lat: 25.7638502, lng: -80.195425},
  distToNext: 1357.7921838766856,
  timeToNext: 1,
  no: 11
  },
  {name: "Government Center",
  latLng: {lat: 25.776034, lng: -80.196061},
  distToNext: 555.1647618017228,
  timeToNext: 2,
  no: 12
  },
  {name: "Historic Overtown",
  latLng: {lat: 25.7810171, lng: -80.19628360000002},
  distToNext: 2278.341256191722,
  timeToNext: 3,
  no: 13
  },
  {name: "Wynwood Walls",
  latLng: {lat: 25.8011729, lng: -80.20023049999999},
  distToNext: 1017.56076304776,
  timeToNext: 3,
  no: 14
  },
  {name: "Buena Vista Blvd",
  latLng: {lat: 25.8081475, lng: -80.1936675},
  distToNext: 587.620711041291,
  timeToNext: 2,
  no: 15
  },
  {name: "Design District",
  latLng: {lat: 25.8134218, lng: -80.1934285},
  distToNext: 0,
  timeToNext: 0,
  no: 16
  }
];


StationModel.create(
  stationsArray,
  (err, stations) => {
      if (err) {
          console.log('ERROR SEEDING STATIONS');
          console.log(err);
          return;
      }

      stations.forEach((station) => {
          console.log('New Station ---> ', station.name);
      });
  }
);
