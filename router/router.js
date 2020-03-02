const express = require('express');
const router = express.Router();
const Tictocdb = require('../model/Tictocdb');



router.route('/fetchPlayer').get((req, res) => {
    Tictocdb.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/addPlayer').post((req, res) => {
  const newUser = new Tictocdb({
    player: req.body.player,
    win: req.body.win,
    lose: req.body.lose,
    game: req.body.game
  })

  newUser.save().then((user) =>
   res.status(200).json(user))
   .catch(err => res.status(400).json("Error: " + err ));
})

router.route('/updateScore/:id').put((req, res) => {
  let id =  req.params.id;

  Tictocdb.findByIdAndUpdate({_id: id}, {$set:{
      win: req.body.win,
      lose: req.body.lose,
      game: req.body.game
    }
  })
  .then(user => res.status(200).json("Score Updated"))
  .catch(err => res.status(400).json('Error' + err));

})

router.route('/removePlayer/:id').delete((req, res, next) => {

  Tictocdb.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({
        msg: result
      })
    }
  })

})

// router.route('/:id').delete(removeUser);

module.exports = router;
