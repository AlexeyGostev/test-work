const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

module.exports = function insertObject(object) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.get('mongodb:uri'), (err, db) => {
      if (err) {
        db.close();
        reject(err);
      }
      let collection = db.collection('objects');
      collection.insert(object, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
        db.close();
      });
    });
  });
};