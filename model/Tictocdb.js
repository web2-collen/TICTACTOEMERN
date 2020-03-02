const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tictoc = new Schema({
  player: {
    type: String,
    required: true
  },
  win: {
    type: Number,
    required: true,
    default: 0
  },
  lose: {
    type: Number,
    required: true,
    default: 0
  },
  game: {
    type:Number,
    required:true,
    default: 0
  }
})

const Tictocdb = mongoose.model('Tictocdb', tictoc);

module.exports = Tictocdb;
