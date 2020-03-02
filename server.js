const express =  require('express');
const mongoose = require('mongoose');
let Tictocdb = require('./model/Tictocdb');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/tictactoe', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const playerRouter = require('./router/router');

app.get('/', async (req, res) => {
  res.send('Hello from React Server');
})

//CREATE USER/PLAYER route
app.use('/player', playerRouter);

// app.post('/newUser', async (req, res) => {
//   const newUser = new Tictocdb({
//     player: req.body.player,
//     win: req.body.win,
//     lose: req.body.lose,
//     game: req.body.game
//   })
//
//   newUser.save().then((user) =>
//    res.json(user))
//    .catch(err => res.status(400).json("Error: " + err ));
// })


app.listen(process.env.PORT || 5000, (req, res) =>
console.log('Listening to Port:5000'))
