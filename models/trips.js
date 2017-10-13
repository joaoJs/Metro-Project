const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    origin: {
      type: String
    },
    destination:  {
      type: String
    },
    distance: {
      type: Number
    },
    time: {
      type: Number
    },
    date: {
      type: String
    }
  },
  {
    timestamps: true
  }
);



const TripModel = mongoose.model('Trip', tripSchema);

module.exports = TripModel;
