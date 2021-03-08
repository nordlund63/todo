const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/item');

router.get('/', (req, res) => {
  Item.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((ex) => {
      res
        .status(500)
        .json({ success: false, msg: `Something bad happened ${ex}` });
    });
});

router.post('/', (req, res) => {
  console.log('Posting');
  let newItem = new Item({
    title: req.body.title,
    done: req.body.done,
  });

  console.log(req.body);

  newItem
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: 'Successfully added!',
        result: {
          _id: result._id,
          title: result.title,
          done: result.done,
        },
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

router.put('/:id', (req, res) => {
  console.log('Putting');
  let updatedItem = {
    done: req.body.done
  };
  Item.findByIdAndUpdate(req.params.id, updatedItem)
  .then((result) => {
    res.json({
      success: true,
      msg: "Updated!",
      title: result.title,
      done: result.done
    });
  })
  .catch((err) => {
    res
      .status(500)
      .json({ success: false, msg: `Something went wrong. ${err}` });
    return;
  });
});

router.delete('/', (req, res) => {
  Item.deleteMany({ done: true })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res
      .status(500)
      .json({ success: false, msg: `Something went wrong. ${err}` });
    return;
  });
});

module.exports = router;
