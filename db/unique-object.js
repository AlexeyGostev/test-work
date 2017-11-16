const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

const equalObjectByFileds = (object1, object2) => {
  let keysObj1 = Object.keys(object1);
  let keysObj2 = Object.keys(object2);

  for (let i = 0; i < keysObj1.length; i += 1) {
    if (keysObj2.indexOf(keysObj1[i]) === -1) {
      return false;
    }
  }
  return true;
};


module.exports = function uniqueObject(object) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.get('mongodb:uri'), (err, db) => {
      if (err) {
        console.log(err.message);
        db.close();
        reject(err);
      }
      let collection = db.collection('objects');
      collection.find({}).toArray()
        .then((objects) => {
          for (let i = 0; i < objects.length; i+= 1) {
            if (equalObjectByFileds(object, objects[i])) {
              db.close();
              resolve(false);
            }
          }
          db.close();
          resolve(true);
        })
        .catch((err) => {
          db.close();
          reject(err);
        })
    });
  });
};