const express = require('express');
const router = express.Router();
const insertObject = require('../db/insert-object');
const uniqueObject = require('../db/unique-object');

router.post('/', async (req, res, next) => {
  let status;
  let response;
  let object = req.body;

  if (!object.ttl) {
    return next(400);
  }
  try {
    let result = await uniqueObject(object);

    if (result) {
      object.expireAt = new Date(Date.now() + +object.ttl * 1000);
      object.create = new Date();
      await insertObject(object);
      status = 200;
      response = true;

    } else {
      status = 400;
      response = false;
    }
    return res.status(status).send(response);
  } catch(err) {
    console.log(err.message);
    return next(500);
  }
});

module.exports = router;