const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metroSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    stations: {
      type: [ StationModel.schema ]
    }
  },
  {
    timestamps: true
  }
);



const MetroModel = mongoose.model('Metro', metroSchema);

module.exports = MetroModel;
