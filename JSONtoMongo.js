'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    Factory = require('./listings.json'),
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */

var entries = Factory.entries;

for (var i = 0; i < entries.length; i++) {
  var newListing;

  if (entries[i].hasOwnProperty('coordinates')) {
    newListing = new Listing({
      code: entries[i].code,
      name: entries[i].name,
      coordinates: {
        latitude: entries[i].coordinates.latitude,
        longitude: entries[i].coordinates.longitude
      },
      address: entries[i].address
    });
  } else {
    newListing = new Listing({
      code: entries[i].code,
      name: entries[i].name
    });
  }

  /*
    Once you've written + run the script, check out your MongoLab database to ensure that
    it saved everything correctly.
   */
  newListing.save(function(err) {
    if (err) throw err;

    console.log('New Listing Created');
  })
}
