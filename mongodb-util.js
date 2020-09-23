"use strict";

const mongo = require("mongodb");
const ObjectID = require("mongodb").ObjectID;

var _db;
module.exports = {
  /*
   * Connects to the database
   *
   * @return callback - status message
   */
  connectToServer: function (callback) {
    mongo.connect(
      process.env.DB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        _db = client.db("<dbname>");
        err
          ? callback({ status: false, message: err })
          : callback({
              status: true,
              message: "Successfully connected to database",
            });
      }
    );
  },

  /*
   * Returns the database object
   *
   */
  getDb: function () {
    return _db;
  },

  /*
   * Insert new issue
   *
   * @param item - the issue JSON object
   *
   * @return callback - status message
   */
  insertOneIssue: function (item, callback) {
    item._id = new ObjectID();
    _db.collection("issues").insertOne(item, (err, result) => {
      err ? callback(err) : callback(item);
    });
  },

  /*
   * Updates the issue specified
   *
   * @param item - the issue JSON object
   *
   * @return callback - status message
   */
  updateOneIssue: function (item, callback) {
    const id = item._id;
    delete item._id;

    item.updated_on = new Date();

    if (!ObjectID.isValid(id)) {
      callback("could not update " + id);
    } else {
      _db
        .collection("issues")
        .updateOne({ _id: ObjectID(id) }, { $set: item }, (err, result) => {
          err
            ? callback("could not update " + id)
            : callback("successfully updated");
        });
    }
  },

  /*
   * Remove the issue based on the id
   *
   * @param item - id string of the issue
   *
   * @return callback - status message
   */
  removeOneIssue: function (id, callback) {
    if (!ObjectID.isValid(id)) {
      callback("_id error");
    } else {
      _db
        .collection("issues")
        .deleteOne({ _id: ObjectID(id) }, (err, result) => {
          err || result.deletedCount === 0
            ? callback("could not delete " + id)
            : callback("deleted " + id);
        });
    }
  },

  /*
   * finds all issues by the project
   *
   * @query - find issues by specific query parameters
   *
   * @return callback - status message if failed or array of issues once successful
   */
  findIssues: function (query, callback) {
    if (query.hasOwnProperty("_id")) {
      const _id = query._id;
      query._id = ObjectID(_id);
    }

    _db
      .collection("issues")
      .find(query)
      .toArray((err, result) => {
        err ? callback("error retrieving issues") : callback(result);
      });
  },
};
