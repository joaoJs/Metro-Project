const mongoose = require('mongoose');

const StationModel = require('../models/station.js');

mongoose.connect('mongodb://localhost/metro-server');

const stationsArray = [
    {name: "Miami Zoo",
     latLng: {lat: 25.6071269, lng: -80.39927949999999},
     distToNext: 3965.0607739911657
    },
    {name: "West Perrine Park",
     latLng: {lat: 25.6071269, lng: -80.39927949999999},
     distToNext: 2588.6435220066046
    },
    {name: "Jackson South Medical Center",
     latLng: {lat: 25.6071269, lng: -80.39927949999999},
     distToNext: 1766.9788734494489
    },
    {name: "The Falls",
     latLng: {lat: 25.6071269, lng: -80.39927949999999},
     distToNext: 5174.801754946771
    },
    {name: "Dadeland South",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 1151.9046000681071
    },
    {name: "Dadeland North",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 2179.366329036528
    },
    {name: "South Miami",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 15535.202538687874
    },
    {name: "University",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 20139.1738466162
    },
    {name: "Douglas Road",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 1783.5647563096068
    },
    {name: "Coconut Grove",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 2933.348538064533
    },
    {name: "Vizcaya",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 2271.02809886992
    },
    {name: "Brickell",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 1357.7921838766856
    },
    {name: "Government Center",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 555.1647618017228
    },
    {name: "Historic Overtown",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 2278.341256191722
    },
    {name: "Wynwood Walls",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 1017.56076304776
    },
    {name: "Buena Vista Blvd",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 587.620711041291
    },
    {name: "Design District",
    latLng: {lat: 25.6071269, lng: -80.39927949999999},
    distToNext: 0
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
